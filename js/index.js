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
    document.getElementById('inputID').placeholder = placeholder;
}

async function getStudentsData(nim) {
    const response = await fetch('https://raw.githubusercontent.com/fikrihandy/validasi_arrasyid/main/data_mhs/mahasiswa.json');
    const data = await response.json();
    return data["mahasiswa"].filter(mhs => mhs["nim"] === nim.toString());
}

function openData() {
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
    const navbar = document.createElement("nav");
    navbar.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-primary");
    const container = document.createElement("div");
    container.classList.add("container");
    const brandLink = document.createElement("a");
    brandLink.classList.add("navbar-brand");
    brandLink.href = "index.html";
    brandLink.textContent = "Validasi Ar-Rasyid Wonogiri";
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("navbar-toggler");
    toggleButton.type = "button";
    toggleButton.dataset.bsToggle = "collapse";
    toggleButton.dataset.bsTarget = "#navbarNavDropdown";
    toggleButton.setAttribute("aria-controls", "navbarNavDropdown");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Toggle navigation");
    const toggleButtonIcon = document.createElement("span");
    toggleButtonIcon.classList.add("navbar-toggler-icon");
    toggleButton.appendChild(toggleButtonIcon);
    const navbarContent = document.createElement("div");
    navbarContent.classList.add("collapse", "navbar-collapse");
    navbarContent.id = "navbarNavDropdown";

    const navbarItems = document.createElement("ul");
    navbarItems.classList.add("navbar-nav", "ms-auto");

    const homeItem = createNavItem("Home", "index.html", inHomepage);
    const umumItem = createNavItem("Umum", "https://arrasyid.ponpes.id/");
    const psbItem = createNavItem("PSB", "https://psb.arrasyid.ponpes.id/");

    const dropdownItem = document.createElement("li");
    dropdownItem.classList.add("nav-item", "dropdown");

    const dropdownLink = document.createElement("a");
    dropdownLink.classList.add("nav-link", "dropdown-toggle");
    dropdownLink.href = "#";
    dropdownLink.role = "button";
    dropdownLink.dataset.bsToggle = "dropdown";
    dropdownLink.setAttribute("aria-expanded", "false");
    dropdownLink.textContent = "Lainnya";

    const dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu");

    const donasiItem = createDropdownItem("Donasi", "https://donasi.arrasyid.ponpes.id/");
    const keuanganItem = createDropdownItem("Keuangan", "https://spp-arrasyid.streamlit.app/");

    dropdownMenu.appendChild(donasiItem);
    dropdownMenu.appendChild(keuanganItem);

    dropdownItem.appendChild(dropdownLink);
    dropdownItem.appendChild(dropdownMenu);

    navbarItems.appendChild(homeItem);
    navbarItems.appendChild(umumItem);
    navbarItems.appendChild(psbItem);
    navbarItems.appendChild(dropdownItem);

    navbarContent.appendChild(navbarItems);

    container.appendChild(brandLink);
    container.appendChild(toggleButton);
    container.appendChild(navbarContent);

    navbar.appendChild(container);

    const navbarContainer = document.getElementById("navbar-container");
    navbarContainer.appendChild(navbar);
}

function createNavItem(title, link, isActive) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    const a = document.createElement("a");
    a.classList.add("nav-link");
    if (isActive === true) {
        a.classList.add("active");
    }
    a.href = link;
    a.textContent = title;
    li.appendChild(a);
    return li;
}

function createDropdownItem(text, href) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('dropdown-item');
    a.href = href;
    a.textContent = text;
    li.appendChild(a);
    return li;
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
    p2.style.marginBottom = '0'

    const a2 = document.createElement('a');
    a2.classList.add('text-white');
    a2.setAttribute('href', 'https://arrasyid.ponpes.id/');
    a2.textContent = 'Ar-Rasyid Media';

    p2.innerHTML = `&copy; 2023 Copyright: `;
    p2.appendChild(a2);
    footer.appendChild(p2);

    document.getElementById('footer-section').appendChild(footer);
}