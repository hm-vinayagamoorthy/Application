"use client";
import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, LinearProgress, Link } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { downloadCSV } from '../utils/downloadCSV';
import { uploadSecretSantaFiles } from '../api/fileUploadService';
const allowedTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];

export default function FileUpload() {
  const [employeesFile, setEmployeesFile] = useState<File | null>(null);
  const [previousYearFile, setPreviousYearFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDownloadUrl(null);

    if (!employeesFile) {
      setError('employeesFile is required');
      return;
    }
    try {
      setLoading(true);
      const data = await uploadSecretSantaFiles(employeesFile, previousYearFile ?? undefined);
      setDownloadUrl(data?.data?.downloadUrl || null);
      downloadCSV(data?.data?.csvContent, 'employees_result.csv')
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Employees File (mandatory) - .xlsx or .csv</Typography>
            <input
              data-testid="employees-file-input"
              required
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (file) {
                  if (!allowedTypes.includes(file.type)) {
                    setError('Invalid file type for Employees file. Only .xlsx or .csv are allowed.');
                    setEmployeesFile(null);
                    return;
                  }
                  setError(null);
                  setEmployeesFile(file);
                } else {
                  setEmployeesFile(null);
                }
              }}
              accept=".csv, .xlsx"
              type="file"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Previous Year File (optional) - .xlsx or .csv</Typography>
            <input
              data-testid="previous-year-file-input"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (file) {
                  if (!allowedTypes.includes(file.type)) {
                    setError('Invalid file type for Previous Year file. Only .xlsx or .csv are allowed.');
                    setPreviousYearFile(null);
                    return;
                  }
                  setError(null);
                  setPreviousYearFile(file);
                } else {
                  setPreviousYearFile(null);
                }
              }}
              accept=".csv, .xlsx"
              type="file"
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          {downloadUrl && (
            <Grid item xs={12}>
              <Typography>
                Upload successful — download file: <Link href={downloadUrl}>{downloadUrl}</Link>
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" startIcon={<UploadFileIcon />} disabled={loading}>
              Upload
            </Button>
          </Grid>

          {loading && (
            <Grid item xs={12}>
              <LinearProgress color="secondary" sx={{
                borderRadius: 1,
                height: 6, // thicker bar
                mt: 1,
                bgcolor: 'grey.300', // background track
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'primary.main', // visible loader color
                },
              }} />
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
}
