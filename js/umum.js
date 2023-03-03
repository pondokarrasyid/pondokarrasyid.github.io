function csvUrlToObj() {
    return fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTSJXksXuLtsgvnyTYNnblwNq4mDGh2z_kJhjeRyE6lgNyZbjfArnAMC0BXr7u9yU3_7FpGuJ1eCWBx/pub?output=csv')
        .then(response => response.text())
        .then(text => {
            const cleanedText = text.replace(/\r/g, '');
            const rows = cleanedText.split('\n');
            const headers = rows[0].split(',');
            return rows.slice(1).map(row => {
                const values = row.split(',');
                const obj = {};
                headers.forEach((header, i) => {
                    obj[header] = values[i];
                });
                return obj;
            });
        });
}

function getDataUmum() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    csvUrlToObj()
        .then(data => {
            const dataU = data.filter(obj => obj['ID_Sertifikat'] === id)[0]; // array of objects representing CSV data
            document.getElementById("nama").innerHTML = dataU['Nama'];
            document.getElementById("sertifikat").innerHTML = dataU['Sertifikat'];
            document.getElementById("tgl").innerHTML = `Diberikan tanggal : ${dataU['Diberikan_Tanggal']}`;
            document.getElementById("id").innerHTML = `ID. ${dataU['ID_Sertifikat']}`;
            document.getElementById("pdf-gdrive").href = dataU['PDF'];
            //load image
            document.getElementById("certif-image").src = `certificates/umum/${id}.jpeg`
            document.getElementById("certif-image").alt = `Sertifikat ${dataU['Sertifikat']} - ${dataU['Nama']}`

        })
        .catch(error => {
            console.error(error);
        });
}