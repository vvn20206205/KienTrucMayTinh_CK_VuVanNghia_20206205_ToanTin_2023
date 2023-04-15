const INPUT = document.getElementById("INPUT");
const OUTPUT0 = document.getElementById("OUTPUT0");
const OUTPUT1 = document.getElementById("OUTPUT1");
const OUTPUT2 = document.getElementById("OUTPUT2");
const OUTPUT3 = document.getElementById("OUTPUT3");
function LoaiBoSpaceCuoiCung(space) {
    return space.replace(/\s+$/, '');
}
function Input1() {
    INPUT.value = 'Ví dụ về ADN mã hóa dữ liệu và lưu trữ văn bản';
    ThayDoiRadioButton("CHUYEN_VAN_BAN_THANH_ADN");

}
function Input2() {
    INPUT.value = 'TAGA TGTT TGCA TGCA TGCC AGAA TTTC TGCC TCAG TGCA TGTA';
    ThayDoiRadioButton("CHUYEN_ADN_THANH_VAN_BAN");
}
function ThayDoiRadioButton(value) {
    var radioButtons = document.getElementsByName("CHUC_NANG");
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].value == value) {
            radioButtons[i].checked = true;
            break;
        }
    }
}
// ! ADN mã hóa, lưu trữ văn bản
// ! ==================================================================
// ! ==================================================================
// ! ==================================================================
// ! Chuyển văn bản thành ADN
function ChuyenVanBanThanhADN(text) {
    OUTPUT0.textContent = ("Bước 0: " + `${text}`);

    // ! Bước 1: Chuyển đổi văn bản thành hệ cơ số 2 (gồm 0,1) như cách hiểu của 1 máy tính thông thường
    let binary = "";
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        let _binary = charCode.toString(2);
        _binary = _binary.padStart(8, "0");
        binary += _binary + " ";
    }
    binary = LoaiBoSpaceCuoiCung(binary);
    OUTPUT1.textContent = ("Bước 1: " + `${binary}`);

    // ! Bước 2: Chuyển đổi hệ cơ số 2 (gồm 0,1) thành hệ cơ số 4 (gồm 0,1,2,3)
    let base4 = '';
    Loop = binary.split(" ");
    Loop.forEach(element => {
        for (let i = 0; i < element.length; i += 2) {
            let twoBits = element.substr(i, 2);
            switch (twoBits) {
                case '00':
                    base4 = base4 + "0";
                    break;
                case '01':
                    base4 = base4 + "1";
                    break;
                case '10':
                    base4 = base4 + "2";
                    break;
                case '11':
                    base4 = base4 + "3";
                    break;
            }
        }
        base4 = base4 + " ";
    });
    base4 = LoaiBoSpaceCuoiCung(base4);
    OUTPUT2.textContent = ("Bước 2: " + `${base4}`);

    // ! Bước 3: Chuyển đổi hệ cơ số 4 (gồm 0,1,2,3) thành ADN (gồm A,T,G,C)
    ADN = base4.replace(/([0-3])/g, (match) => {
        switch (match) {
            case "0":
                return "A";
            case "1":
                return "T";
            case "2":
                return "G";
            case "3":
                return "C";
        }
    });
    OUTPUT3.textContent = ("Bước 3: " + `${ADN}`);
}
// ! ==================================================================
// ! Chuyển ADN thành văn bản
function ChuyenADNThanhVanBan(ADN) {
    OUTPUT0.textContent = ("Bước 0: " + `${ADN}`);

    // ! Bước 1: Chuyển đổi ADN (gồm A,T,G,C) thành hệ cơ số 4 (gồm 0,1,2,3) 
    let base4 = ADN.replace(/([A-Z])/g, (match) => {
        switch (match) {
            case "A":
                return "0";
            case "T":
                return "1";
            case "G":
                return "2";
            case "C":
                return "3";
        }
    });

    OUTPUT1.textContent = ("Bước 1: " + `${base4}`);

    // ! Bước 2: Chuyển đổi hệ cơ số 4 (gồm 0,1,2,3) thành hệ cơ số 2 (gồm 0,1) 
    let binary = '';
    Loop = base4.split(" ");
    Loop.forEach(element => {
        for (let i = 0; i < element.length; i += 1) {
            let oneBit = element.substr(i, 1);
            switch (oneBit) {
                case '0':
                    binary = binary + "00";
                    break;
                case '1':
                    binary = binary + "01";
                    break;
                case '2':
                    binary = binary + "10";
                    break;
                case '3':
                    binary = binary + "11";
                    break;
            }
        }
        binary = binary + " ";
    });
    binary = LoaiBoSpaceCuoiCung(binary);
    OUTPUT2.textContent = ("Bước 2: " + `${binary}`);

    // ! Bước 3: Chuyển đổi hệ cơ số 2 (gồm 0,1) thành văn bản
    let text = "";
    Loop = binary.split(" ");
    Loop.forEach(element => {
        Loop = String.fromCharCode(parseInt(element, 2));
        text += (Loop);
    });
    OUTPUT3.textContent = ("Bước 3: " + `${text}`);
}

// ! hàm Main của chương trình
function Main() {
    try {
        // ! lấy input 
        var GiaTriInput = INPUT.value;
        var ChucNang = document.querySelector('input[name="CHUC_NANG"]:checked').value;

        // ! Theo lựa chọn của người dùng 
        if (ChucNang == "CHUYEN_ADN_THANH_VAN_BAN") {
            ChuyenADNThanhVanBan(GiaTriInput);
        }
        if (ChucNang == "CHUYEN_VAN_BAN_THANH_ADN") {
            ChuyenVanBanThanhADN(GiaTriInput);
        }
    } catch (error) {
        document.getElementById("OUTPUT0").innerHTML = error.message;
    }
} 