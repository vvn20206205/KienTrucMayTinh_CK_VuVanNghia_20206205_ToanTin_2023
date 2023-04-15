function CoppyInput(id) {
    const sequence = document.getElementById(`seq${id}`).innerText;
    PLAYER_INPUT.value = sequence;
}
const LIST_HINH_VUONG = document.querySelectorAll(".hinhvuong");
const PLAYER_INPUT = document.querySelector("#player-input");
const KET_THUC = document.querySelector("#ketthuc");
const SUBMIT_BUTTON = document.querySelector("#submit-button");
let LuotChoi = 0.5;
// ! Tic Tac Toe
// ! ==================================================================
// ! ==================================================================
// ! ==================================================================
// ! Các đầu vào input như các nhà khoa học đề xuất
const INPUT_ADN = {
    11: "AACGACTGCACCACG",
    12: "CTCTCCCTGTACCCA",
    13: "ACCCCTCTCGCTCTT",
    14: "TTCTGCCTTGATCCG",
    21: "TGTTGTCTTATCCAT",
    22: "TCAGATGCTACGTGT",
    23: "ACCGTACTCGACCTA",
    24: "TCGGATCTCGGTTTC",
    31: "TACACGCTGGTCAAT",
    32: "CACTATCTCGAATCA",
    33: "GCGTGACTGCGGCAT",
    34: "GTTGGTCTTGTAGGA",
    41: "GCTAGGCTATCGCGT",
    42: "TAATACCTGAGCGGG",
    43: "TACCCCCTAGTCTGC",
    44: "AACGGACTTCAACAG",
    61: "CGGGATCTCGTCGGT",
    62: "ATCGCTCTCCATGCA",
    63: "ATCTATCTCGTTCCG",
    64: "ACTCCGCTCGACTTA",
    71: "GGATCACTTACGTAT",
    72: "GGTAGCCTTTTATCG",
    73: "CATTGCCTCGATATC",
    74: "CCAGACCTTTCAAGT",
    81: "TGCGTACTTTGGGTC",
    82: "TCAGGGCTACGCAAG",
    83: "TAATTACTGTTTCAC",
    84: "GGATGCCTGGCGTCT",
    91: "TGCTATCTCGACAAG",
    92: "CTCAGGCTGTGTATT",
    93: "CAGAGCTATACGGAG",
    94: "GCTACTCTGGGTGCT"
};
// ! Trạng thái bàn cờ ban đầu là AAAAAAAAAAAAAAA
// ! máy tính đi trước ở giữa là TTTTTTTTTTTTTTT
let TrangThaiBanCo = ["AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "TTTTTTTTTTTTTTT", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA"];
// ! Hàm in bàn cờ
// ! in số lượt và kí tự X, O 
InBanCo();
function InBanCo() {
    LuotChoi += 0.5;
    KET_THUC.textContent = "Lượt: " + LuotChoi;
    UpdateButtons();
    for (let i = 0; i < LIST_HINH_VUONG.length; i++) {
        if (TrangThaiBanCo[i] === "TTTTTTTTTTTTTTT") {
            LIST_HINH_VUONG[i].textContent = "X";
        } else if (TrangThaiBanCo[i] === "AAAAAAAAAAAAAAA") {
            LIST_HINH_VUONG[i].textContent = " ";
        } else {
            LIST_HINH_VUONG[i].textContent = "O";
        }
    }
}
function UpdateButtons() {
    for (let j = 1; j <= 9; j++) {
        for (let i = 1; i <= 4; i++) {
            if (j === 5) {
                continue;
            }
            var button = document.getElementById("button" + j + i);
            if (i === LuotChoi) {
                button.style.backgroundColor = "green";
                button.style.color = "white";
            } else {
                button.style.backgroundColor = "buttonface";
                button.style.color = "white";
            }
        }
    }
}
// ! Nhận input của người chơi và tính toán
SUBMIT_BUTTON.addEventListener("click", function () {
    // ! Lượt của người chơi 
    LuotCuaNguoi(PLAYER_INPUT.value);
    InBanCo();
    PLAYER_INPUT.value = '';
    // ! Lượt của AI
    LuotCuaAI();
    InBanCo();
    if (KiemTraBanCoKetThuc()) {
        setTimeout(function () {
            KET_THUC.textContent = ("=> Kết thúc!");
        }, 200);
    }
});

function LuotCuaNguoi(a) {
    let b = LayKeyInputADN(a);
    TrangThaiBanCo[Math.floor(b / 10) - 1] = a;
}
function LayKeyInputADN(a) {
    for (var key in INPUT_ADN) {
        if (INPUT_ADN[key] === a) {
            return key;
        }
    }
}
// ! Kiểm tra bàn cờ kết thúc
function KiemTraBanCoKetThuc() {
    if (LuotChoi === 5) {
        SUBMIT_BUTTON.style.pointerEvents = "none";
        return true;
    }
    if ((LIST_HINH_VUONG[0].textContent != " " && LIST_HINH_VUONG[0].textContent === LIST_HINH_VUONG[1].textContent && LIST_HINH_VUONG[2].textContent === LIST_HINH_VUONG[1].textContent) ||
        (LIST_HINH_VUONG[3].textContent != " " && LIST_HINH_VUONG[3].textContent === LIST_HINH_VUONG[4].textContent && LIST_HINH_VUONG[5].textContent === LIST_HINH_VUONG[3].textContent) ||
        (LIST_HINH_VUONG[6].textContent != " " && LIST_HINH_VUONG[6].textContent === LIST_HINH_VUONG[7].textContent && LIST_HINH_VUONG[8].textContent === LIST_HINH_VUONG[6].textContent) ||
        (LIST_HINH_VUONG[0].textContent != " " && LIST_HINH_VUONG[0].textContent === LIST_HINH_VUONG[3].textContent && LIST_HINH_VUONG[6].textContent === LIST_HINH_VUONG[0].textContent) ||
        (LIST_HINH_VUONG[1].textContent != " " && LIST_HINH_VUONG[1].textContent === LIST_HINH_VUONG[4].textContent && LIST_HINH_VUONG[7].textContent === LIST_HINH_VUONG[1].textContent) ||
        (LIST_HINH_VUONG[2].textContent != " " && LIST_HINH_VUONG[2].textContent === LIST_HINH_VUONG[5].textContent && LIST_HINH_VUONG[8].textContent === LIST_HINH_VUONG[2].textContent) ||
        (LIST_HINH_VUONG[0].textContent != " " && LIST_HINH_VUONG[0].textContent === LIST_HINH_VUONG[4].textContent && LIST_HINH_VUONG[8].textContent === LIST_HINH_VUONG[0].textContent) ||
        (LIST_HINH_VUONG[2].textContent != " " && LIST_HINH_VUONG[2].textContent === LIST_HINH_VUONG[4].textContent && LIST_HINH_VUONG[6].textContent === LIST_HINH_VUONG[2].textContent)) {
        return true;
    } else {
        return false;
    }
}
function DiChuyenBuocDiCuaAI(a) {
    TrangThaiBanCo[a - 1] = "TTTTTTTTTTTTTTT";
}
function KiemTraGiaTriTonTaiADNBanCo(value) {
    return TrangThaiBanCo.indexOf(value) !== -1;
}
function KiemTraGiaTriTrongBanCo(value) {
    return (TrangThaiBanCo[value - 1] != "AAAAAAAAAAAAAAA");
}

// ! Lượt của AI (if else các ô trên bản cờ)
function LuotCuaAI() {
    check1();
    check2();
    check3();
    check4();
    check6();
    check7();
    check8();
    check9();
}
function check1() {
    if (KiemTraGiaTriTrongBanCo(1)) return;

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62])) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[33]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[44])) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[73])) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42])) DiChuyenBuocDiCuaAI(1);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[73]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]))) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[83]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]))) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[23]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]))) DiChuyenBuocDiCuaAI(1);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[73]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]))) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[33]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]))) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[23]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]))) DiChuyenBuocDiCuaAI(1);
}
function check2() {

    if (KiemTraGiaTriTrongBanCo(2)) return;


    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[32]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[72]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[92]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[12]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[32]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[72]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[92]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]))) DiChuyenBuocDiCuaAI(2);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[13])) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[93]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[34])) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91])) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61])) DiChuyenBuocDiCuaAI(2);
}

function check3() {


    if (KiemTraGiaTriTrongBanCo(3)) return;

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22])) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82])) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[13])) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[93]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[24])) DiChuyenBuocDiCuaAI(3);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[63]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]))) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[93]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]))) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[13]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11]))) DiChuyenBuocDiCuaAI(3);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[63]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]))) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[43]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]))) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[13]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]))) DiChuyenBuocDiCuaAI(3);
}

function check4() {
    if (KiemTraGiaTriTrongBanCo(4)) return;


    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[92]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[72]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[32]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[12]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[92]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[32]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[12]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]))) DiChuyenBuocDiCuaAI(4);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[73])) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[33]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[14])) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21])) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31])) DiChuyenBuocDiCuaAI(4);
}

function check6() {

    if (KiemTraGiaTriTrongBanCo(6)) return;


    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[12]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[32]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[72]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[21]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[92]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[12]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[72]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[92]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]))) DiChuyenBuocDiCuaAI(6);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[73]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[94])) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[33])) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[71])) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81])) DiChuyenBuocDiCuaAI(6);
}
function check7() {
    if (KiemTraGiaTriTrongBanCo(7)) return;

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22])) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[93])) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[13]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[84])) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82])) DiChuyenBuocDiCuaAI(7);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[63]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]))) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[93]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]))) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[43]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41]))) DiChuyenBuocDiCuaAI(7);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[93]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]))) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[43]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]))) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[13]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]))) DiChuyenBuocDiCuaAI(7);
}
function check8() {
    if (KiemTraGiaTriTrongBanCo(8)) return;

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[72]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[32]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[91]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[12]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[92]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[72]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[32]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[61]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[12]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[82]))) DiChuyenBuocDiCuaAI(8);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[13]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[74])) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[93])) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[11])) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[41])) DiChuyenBuocDiCuaAI(8);
}
function check9() {
    if (KiemTraGiaTriTrongBanCo(9)) return;

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[73]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[64])) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[22]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[33])) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62])) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]) && KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42])) DiChuyenBuocDiCuaAI(9);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[73]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]))) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[83]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]))) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[62]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[33]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[31]))) DiChuyenBuocDiCuaAI(9);

    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[83]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]))) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[33]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]))) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[42]) && (KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[23]) || KiemTraGiaTriTonTaiADNBanCo(INPUT_ADN[81]))) DiChuyenBuocDiCuaAI(9);
}