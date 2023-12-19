import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const GET = async (url: string) => {
  try {
    return await axios({
      method: 'get',
      url: `${baseUrl}/${url}`,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    return err;
  }
};

export const POST = async (url: string, body: any) => {
  try {
    return await axios({
      method: 'post',
      url: `${baseUrl}/${url}`,
      data: body,
      // responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    return err;
  }
};

export const DELETE = async (url: string, id: number) => {
  try {
    return await axios({
      method: 'delete',
      url: `${baseUrl}/${url}/${id}`,
      // responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    return err;
  }
};

export const POSTWITHTOKEN = async (url: string, body: any, token: string) => {
  try {
    return await axios({
      method: 'post',
      url: `${baseUrl}/${url}`,
      data: body,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  } catch (err: any) {
    return err;
  }
};

export const GETWITHTOKEN = async (url: string, token: string) => {
  try {
    return await axios({
      method: 'get',
      url: `${baseUrl}/${url}`,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  } catch (err: any) {
    return err;
  }
};
