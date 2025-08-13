import axios from 'axios';

 interface SecretSantaRecord {
  Employee_Name: string;
  Employee_EmailID: string;
  Secret_Child_Name: string;
  Secret_Child_EmailID: string;
}

// Inner data object
 interface UploadResponseData {
  message: string;
  downloadUrl: string;
  csvContent: SecretSantaRecord[];
}

// Axios response wrapper
interface UploadResponse {
  data: UploadResponseData;
}
export async function uploadSecretSantaFiles(
  employeesFile: File,
  previousYearFile?: File
): Promise<UploadResponse> {
    const apiUrl = process.env.NEXT_PUBLIC_SECRET_SANTA_API;
  const formData = new FormData();
  formData.append('employeesFile', employeesFile);
  if (previousYearFile) formData.append('previousYearFile', previousYearFile);

  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  try {
    const res = await axios.post<UploadResponse>(
      apiUrl,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return res.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error(err.message || 'Upload failed');
    }
  }
}
