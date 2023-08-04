import axios from "axios";

function upload(path, changeUserForm) {
    const params = new FormData();
    for (let i in changeUserForm) {
        params.append(i, changeUserForm[i]);
    }
    return axios
        .post(path, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data);
}

export default upload;
