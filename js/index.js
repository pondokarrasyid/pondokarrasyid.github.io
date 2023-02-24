const myLoc = window.location.pathname;
let inHomepage = (myLoc === '/') || (myLoc === '/index.html');
const urlParams = new URLSearchParams(window.location.search);

window.onload = function () {
    insertNavbar();
    insertFooter();
    if (inHomepage) {
        selectData();
    }
    if (urlParams.get('error') === '1') {
        console.log("error1");
    }
};

function selectData() {
    const selectedValue = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    let placeholder;
    switch (selectedValue) {
        case 'option1':
            placeholder = 'NIM Masyid';
            document.getElementById('img-screen').src = 'img/masyid.png';
            break;
        case 'option2':
            placeholder = 'NIS KMI';
            document.getElementById('img-screen').src = 'img/kmi.png';
            break;
        case 'option3':
            placeholder = 'ID / No. Sertifikat';
            document.getElementById('img-screen').src = 'img/sertifikat.png';
            break;
    }
    document.getElementById('inputID').placeholder = `Masukkan ${placeholder}`;
}

async function getStudentsData(nim) {
    const response = await fetch('https://raw.githubusercontent.com/fikrihandy/validasi_arrasyid/main/data_mhs/mahasiswa.json');
    const data = await response.json();
    return data["mahasiswa"].filter(mhs => mhs["nim"] === nim.toString());
}

function openDataNewTab() {
    event.preventDefault();
    const selectedValue = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    const inputIdValue = document.getElementById("inputID").value;
    switch (selectedValue) {
        case 'option1':
            window.open(`mhs.html?nim=${inputIdValue}`, '_self');
            break;
        case 'option2':
            window.open(`kmi.html?nis=${inputIdValue}`, '_self');
            break;
        case 'option3':
            window.open(`certificate.html?id=${inputIdValue}`, '_self');
            break;
    }
}

function searchAndShow() {
    const nim = urlParams.get('nim');
    getStudentsData(nim)
        .then(data => {
            document.getElementById("nama").innerHTML = data[0]["nama"];
            document.getElementById("nim").innerHTML = `NIM: ${data[0]["nim"]}`;
            document.getElementById("nomor_ijazah").innerHTML = `No. ${data[0]["nomor_ijazah"]}`;
            document.getElementById("ttl").innerHTML = `Lahir: ${data[0]["ttl"]}`;
            document.getElementById("thn_lulus").innerHTML = `Tahun Lulus: ${data[0]["tahun_lulus"]}`;
            document.getElementById("certif-image").src = `certificates/mhs/${data[0]["nim"]}.jpeg`;
        })
        .catch(error => {
            window.open('index.html?error=1', '_self');
        });
}

function insertNavbar() {
    const navbarContainer = document.getElementById('navbar-container');

    const nav = document.createElement('nav');
    nav.classList.add('navbar', 'navbar-dark', 'navbar-expand-lg', 'bg-body-tertiary', 'bg-primary');

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');

    const brandLink = document.createElement('a');
    brandLink.classList.add('navbar-brand');
    brandLink.href = '/index.html';
    brandLink.textContent = 'Validasi Ar-Rasyid Wonogiri';

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('navbar-toggler');
    toggleButton.type = 'button';
    toggleButton.dataset.bsToggle = 'collapse';
    toggleButton.dataset.bsTarget = '#navbarNavDropdown';
    toggleButton.ariaControls = 'navbarNavDropdown';
    toggleButton.ariaExpanded = 'false';
    toggleButton.ariaLabel = 'Toggle navigation';

    const toggleIcon = document.createElement('span');
    toggleIcon.classList.add('navbar-toggler-icon');

    const collapseDiv = document.createElement('div');
    collapseDiv.classList.add('collapse', 'navbar-collapse');
    collapseDiv.id = 'navbarNavDropdown';

    const ul = document.createElement('ul');
    ul.classList.add('navbar-nav', 'ms-auto');

    const homeLink = document.createElement('a');
    homeLink.classList.add('nav-link', 'nav-item');
    if (inHomepage) {
        homeLink.classList.add('active')
    }
    homeLink.href = 'index.html';
    homeLink.textContent = 'Home';

    const umumLink = document.createElement('a');
    umumLink.classList.add('nav-link', 'nav-item');
    umumLink.href = 'https://arrasyid.ponpes.id';
    umumLink.textContent = 'Umum';

    const psbLink = document.createElement('a');
    psbLink.classList.add('nav-link', 'nav-item');
    psbLink.href = 'https://psb.arrasyid.ponpes.id';
    psbLink.textContent = 'PSB';

    const dropdownLink = document.createElement('a');
    dropdownLink.classList.add('nav-link', 'dropdown-toggle', 'nav-item');
    dropdownLink.href = '#';
    dropdownLink.role = 'button';
    dropdownLink.dataset.bsToggle = 'dropdown';
    dropdownLink.ariaExpanded = 'false';
    dropdownLink.textContent = 'Lainnya';

    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu');

    const keuanganLink = document.createElement('a');
    keuanganLink.classList.add('dropdown-item');
    keuanganLink.href = 'https://spp-arrasyid.streamlit.app';
    keuanganLink.textContent = 'Keuangan';

    const donasiLink = document.createElement('a');
    donasiLink.classList.add('dropdown-item');
    donasiLink.href = 'https://donasi.arrasyid.ponpes.id';
    donasiLink.textContent = 'Donasi';

    navbarContainer.appendChild(nav);
    nav.appendChild(containerDiv);
    containerDiv.appendChild(brandLink);
    containerDiv.appendChild(toggleButton);
    toggleButton.appendChild(toggleIcon);
    containerDiv.appendChild(collapseDiv);
    collapseDiv.appendChild(ul);
    ul.appendChild(homeLink);
    ul.appendChild(umumLink);
    ul.appendChild(psbLink);
    ul.appendChild(dropdownLink);
    dropdownLink.appendChild(dropdownMenu);
    dropdownMenu.appendChild(keuanganLink);
    dropdownMenu.appendChild(donasiLink);
}

function insertFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('text-center', 'text-white', 'bg-primary');

    const container = document.createElement('div');
    container.classList.add('container', 'p-4', 'pb-0');

    const section = document.createElement('section');

    const p = document.createElement('p');
    p.classList.add('d-flex', 'justify-content-center', 'align-items-center');

    const span = document.createElement('span');
    span.classList.add('me-3');
    span.textContent = 'Hubungi Admin';
    p.appendChild(span);

    const a = document.createElement('a');
    a.classList.add('btn', 'btn-success', 'btn-outline-light', 'btn-rounded');
    a.setAttribute('href', 'https://wa.me/6289692703057');
    a.setAttribute('target', '_blank');
    a.setAttribute('role', 'button');
    a.textContent = 'WhatsApp';
    p.appendChild(a);

    section.appendChild(p);
    container.appendChild(section);
    footer.appendChild(container);

    const p2 = document.createElement('p');
    p2.classList.add('text-center', 'p-3');
    p2.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

    const a2 = document.createElement('a');
    a2.classList.add('text-white');
    a2.setAttribute('href', 'https://arrasyid.ponpes.id/');
    a2.textContent = 'Ar-Rasyid Media';

    p2.innerHTML = `&copy; 2023 Copyright: `;
    p2.appendChild(a2);
    footer.appendChild(p2);

    document.getElementById('footer-section').appendChild(footer);
}