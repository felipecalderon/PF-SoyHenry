import { getDataEmpresa } from "../slices/postSlices";


export const fetchEmpresaData = (companyId) => async (dispatch) => {
  try {
    const response = await fetch(`/empresa/${companyId}`);
    const data = await response.json();
    dispatch(getDataEmpresa(data));
    return data;
  } catch (error) {
    console.error( error);
  }
};