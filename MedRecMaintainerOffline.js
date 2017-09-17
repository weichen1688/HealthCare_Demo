function log(input) {
    if (typeof input === 'object') {
        input = JSON.stringify(input, null, 2);
    }
    $('#log').html(input + '\n' + $('#log').html());
}

var input_id = prompt("請輸入身分證號 ", " ")

//document.getElementById('tabs').style.display = 'block';

$("#tabs").tabs();

for (i = 2; i < 6; i++) {
    $("#h" + i + "_datepicker").datepicker();
    $("#h" + i + "_datepicker1").datepicker();
    $("#h" + i + "_datepicker2").datepicker();
    $("#h" + i + "_datepicker3").datepicker();
    $("#h" + i + "_datepicker4").datepicker();
    $("#h" + i + "_datepicker5").datepicker();
}


var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
var eth = web3.eth

var RegistrarContractAbi = [{
    "constant": false,
    "inputs": [{"name": "id", "type": "bytes32"}, {"name": "id_address", "type": "address"}],
    "name": "updateIdAddressToRegistries",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "id", "type": "bytes32"}, {"name": "name", "type": "bytes32"}],
    "name": "updateNameToRegistries",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "checkAddress",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "seq", "type": "uint256"}],
    "name": "checkTxnLogBySeq",
    "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "bytes32"}, {
        "name": "",
        "type": "bytes32"
    }, {"name": "", "type": "address"}, {"name": "", "type": "address"}, {"name": "", "type": "bytes32"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "checkMsgSender",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "checkRegistriesSize",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "id", "type": "bytes32"}],
    "name": "removeFromRegistries",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "id", "type": "bytes32"}, {"name": "sc_address", "type": "address"}],
    "name": "updateSCAddressToRegistries",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "id", "type": "bytes32"}, {"name": "name", "type": "bytes32"}, {
        "name": "id_address",
        "type": "address"
    }, {"name": "sc_address", "type": "address"}],
    "name": "addToRegistries",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "id", "type": "bytes32"}],
    "name": "checkRegistries",
    "outputs": [{"name": "", "type": "bytes32"}, {"name": "", "type": "address"}, {"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "checkTxnLogSize",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "id", "type": "bytes32"}, {"name": "name", "type": "bytes32"}, {
        "name": "id_address",
        "type": "address"
    }, {"name": "sc_address", "type": "address"}],
    "name": "updateAllToRegistries",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "inputs": [{"name": "register_account", "type": "address"}],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "id", "type": "bytes32"}, {
        "indexed": false,
        "name": "name",
        "type": "bytes32"
    }, {"indexed": false, "name": "id_address", "type": "address"}, {
        "indexed": false,
        "name": "sc_adress",
        "type": "address"
    }],
    "name": "EventForAddToRegistries",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "id", "type": "bytes32"}],
    "name": "EventForRemoveFromRegistries",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "id", "type": "bytes32"}, {
        "indexed": false,
        "name": "name",
        "type": "bytes32"
    }, {"indexed": false, "name": "id_address", "type": "address"}, {
        "indexed": false,
        "name": "sc_adress",
        "type": "address"
    }],
    "name": "EventForUpdateToRegistries",
    "type": "event"
}];

var RegistrarContract = web3.eth.contract(RegistrarContractAbi);
var RegistrarContractAddress = '0x492789b269c65bd0bd6539f9a59c2a84c631bbdb';
var Registrar = RegistrarContract.at(RegistrarContractAddress);

//alert('Finish getting Registrar Instance');

var fields = Registrar.checkRegistries(input_id)
var f_name = fields[0]
var f_id_address = fields[1]
var f_sc_address = fields[2]

if (f_id_address == "0x0000000000000000000000000000000000000000" || f_sc_address == "0x0000000000000000000000000000000000000000") {
    alert("未註冊之身分證號")
}

var user_account = web3.eth.accounts[0];

alert(f_id_address + " " + web3.eth.accounts[0])
if (f_id_address != user_account) {
    alert("身分證號不符")
}

alert("個人區塊鏈位址" + f_id_address + "授權合約位址：" + f_sc_address)

var SummaryContractAbi = [{
    "constant": true,
    "inputs": [{"name": "hospital_requester", "type": "bytes32"}, {"name": "hospital_provider", "type": "bytes32"}],
    "name": "checkItemSize",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "checkAddress",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "seq", "type": "uint256"}],
    "name": "checkTxnLogBySeq",
    "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "bytes32[]"}, {
        "name": "",
        "type": "bytes32[]"
    }, {"name": "", "type": "uint256"}, {"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "checkMsgSender",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "addr", "type": "address"}],
    "name": "addModifier",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "checkHospitalSize",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "hospital_requester", "type": "bytes32"}, {
        "name": "hospital_provider",
        "type": "bytes32"
    }, {"name": "item_id", "type": "bytes32"}],
    "name": "getItem",
    "outputs": [{"name": "", "type": "bytes32"}, {"name": "", "type": "bytes32[]"}, {
        "name": "",
        "type": "uint256"
    }, {"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "hospital_requester", "type": "bytes32"}, {
        "name": "hospital_provider",
        "type": "bytes32"
    }, {"name": "item_id", "type": "bytes32"}],
    "name": "removeItemFromSummaries",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "canModify",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "modifierCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "addr", "type": "address"}],
    "name": "removeModifier",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "hospital_requester", "type": "bytes32"}, {
        "name": "hospital_provider",
        "type": "bytes32"
    }, {"name": "item_id", "type": "bytes32"}, {"name": "item_name", "type": "bytes32"}, {
        "name": "purposes",
        "type": "bytes32[]"
    }, {"name": "provider_exp_time", "type": "uint256"}, {"name": "item_exp_time", "type": "uint256"}],
    "name": "updateItemToSummaries",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "inputs": [{"name": "owner_address", "type": "address"}],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "time", "type": "uint256"}, {
        "indexed": false,
        "name": "owner_id_address",
        "type": "address"
    }, {"indexed": false, "name": "hospital_requester", "type": "bytes32"}, {
        "indexed": false,
        "name": "hospital_provider",
        "type": "bytes32"
    }, {"indexed": false, "name": "item_id", "type": "bytes32"}, {
        "indexed": false,
        "name": "item_name",
        "type": "bytes32"
    }, {"indexed": false, "name": "purposes", "type": "bytes32[]"}, {
        "indexed": false,
        "name": "provider_exp_time",
        "type": "uint256"
    }, {"indexed": false, "name": "item_exp_time", "type": "uint256"}],
    "name": "EventForUpdateToSummaries",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "time", "type": "uint256"}, {
        "indexed": false,
        "name": "owner_id_address",
        "type": "address"
    }, {"indexed": false, "name": "hospital_requester", "type": "bytes32"}, {
        "indexed": false,
        "name": "hospital_provider",
        "type": "bytes32"
    }, {"indexed": false, "name": "item_id", "type": "bytes32"}],
    "name": "EventForRemoveFromSummaries",
    "type": "event"
}];

var SummaryContract = web3.eth.contract(SummaryContractAbi);
var SummaryContractAddress = f_sc_address;
var Summary = SummaryContract.at(SummaryContractAddress);

//alert('Finish getting Summary Instance');

$('#display_id').val(input_id);
$('#display_id').attr("readonly", "readonly")

document.getElementById('h5_openKeyFile').addEventListener('change', openKeyFile, false);

contractControl(Registrar, Summary, input_id, eth)

function contractControl(Registrar, Summary, input_id, eth) {

    $('#h2_resetInput').on('click', function () {
        resetInput("h2");
    })

    $('#h3_resetInput').on('click', function () {
        resetInput("h3");
    })

    $('#h4_resetInput').on('click', function () {
        resetInput("h4");
    })

    $('#h5_resetInput').on('click', function () {
        resetInput("h5");
    })

    $('#h2_updateItemToSummaries').on('click', function () {
        updateItemToSummaries(Summary, "h2");
    })

    $('#h3_updateItemToSummaries').on('click', function () {
        updateItemToSummaries(Summary, "h3");
    })

    $('#h4_updateItemToSummaries').on('click', function () {
        updateItemToSummaries(Summary, "h4");
    })

    $('#h5_updateItemToSummaries').on('click', function () {
        updateItemToSummaries(Summary, "h5");
    })

    $('#h5_sendRawTxn').on('click', function () {
        sendRawTxn(Summary);
    })

    $('#h5_updateItemToSummariesOffline').on('click', function () {
        updateItemToSummariesOffline(Summary, SummaryContractAddress, "h5");
    })

    $('#h2_getItem').on('click', function () {
        getItem(Summary, "h2");
    })

    $('#h3_getItem').on('click', function () {
        getItem(Summary, "h3");
    })

    $('#h4_getItem').on('click', function () {
        getItem(Summary, "h4");
    })

    $('#h5_getItem').on('click', function () {
        getItem(Summary, "h5");
    })

    /*
    $('#getTransactionReceipt').on('click', function() {

        var dataA = eth.getTransactionReceipt($('#data5_txnHash').val())
        //$('#log').text($('#log').text() + JSON.stringify(dataA, null, 2) + '\n')
        log(dataA)

    })

    $('#checkTxnLogBySeq').on('click', function() {

        var fields = Summary.checkTxnLogBySeq($('#data4_seq').val())
        var f_time = fields[0]
        var f_hid = fields[1]
        var f_iid = fields[2]
        var f_iname = fields[3]
        var f_purposes = fields[4]
        var f_note = fields[5]

        var d = new Date();
        var s_time = new Date(f_time * 1000 + d.getTimezoneOffset() * 60000)

        var s_hid = f_hid.match(/.{1,2}/g).map(function(v) {
            return String.fromCharCode(parseInt(v, 16));
        }).join('');

        var s_iid = f_iid.match(/.{1,2}/g).map(function(v) {
            return String.fromCharCode(parseInt(v, 16));
        }).join('');

        var s_iname = f_iname.match(/.{1,2}/g).map(function(v) {
            return String.fromCharCode(parseInt(v, 16));
        }).join('');

        var s_note = f_note.match(/.{1,2}/g).map(function(v) {
            return String.fromCharCode(parseInt(v, 16));
        }).join('');

        log(' 交易紀錄 : ' + $('#data4_seq').val() + ' { \n' +
            ' 交易時間 : ' + s_time + '\n' +
            ' 醫院代號 : ' + s_hid + '\n' +
            ' 項目代號 : ' + s_iid + '\n' +
            ' 項目名稱 : ' + s_iname + '\n' +
            ' 授權目的 : ' + f_purposes + '\n' +
            ' 交易備註 : ' + s_note + '\n}')

    })
    */


    $('#h2_delete_item1').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h2", "ITEM1");
    })

    $('#h2_delete_item2').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h2", "ITEM2");
    })

    $('#h2_delete_item3').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h2", "ITEM3");
    })

    $('#h2_delete_item4').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h2", "ITEM4");
    })

    $('#h2_delete_item5').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h2", "ITEM5");
    })

    $('#h3_delete_item1').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h3", "ITEM1");
    })

    $('#h3_delete_item2').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h3", "ITEM2");
    })

    $('#h3_delete_item3').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h3", "ITEM3");
    })

    $('#h3_delete_item4').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h3", "ITEM4");
    })

    $('#h3_delete_item5').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h3", "ITEM5");
    })

    $('#h4_delete_item1').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h4", "ITEM1");
    })

    $('#h4_delete_item2').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h4", "ITEM2");
    })

    $('#h4_delete_item3').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h4", "ITEM3");
    })

    $('#h4_delete_item4').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h4", "ITEM4");
    })

    $('#h4_delete_item5').on('click', function () {
        var h_id = $('#hospital_id').val();
        deleteItem(Summary, h_id, "h4", "ITEM5");
    })


}

function resetInput(other_hospital_id) {

    for (i = 1; i <= 5; i++) {
        for (k = 1; k <= 5; k++) {
            $('#' + other_hospital_id + '_item' + i + '_p' + k).prop("checked", false);
            $('#' + other_hospital_id + '_datepicker' + k).datepicker("setDate", null);

            if(other_hospital_id == 'h5') {
                //$('#h5_txn_signed_' + i).attr("value","");
                $('#h5_txn_signed_' + i).val("");
            }
        }
    }
    $('#' + other_hospital_id + '_datepicker').datepicker("setDate", null);

    /*
    if(other_hospital_id == 'h5') {
        $('#inp_pass').val('');
        $('#showpubkey').val('');
        $('#showprivkey').val('');
    }
    */
}

function updateItemToSummaries(Summary, other_hospital_id) {

    var h_id = $('#hospital_id').val();

    //alert(h_id)
    //alert(other_hospital_id)


    var provider_exp_date = $('#' + other_hospital_id + '_datepicker').datepicker("getDate")
    var provider_expire_ts = 0;

    if (provider_exp_date != null) {
        provider_expire_ts = Math.round(+provider_exp_date / 1000)
    }


    for (i = 1; i <= 5; i++) {

        var item_id = 'ITEM' + i
        var item_name = 'ITEM' + i
        var purposes = []

        /*
        var fields = Summary.getItem(h_id,item_id)
        var _name = fields[0]

        if(_name.charAt(10) == '3' && _name.charAt(11) == i) {
            log(item_id+"項目已存在，將更新項目")
        }
        */

        for (j = 1; j <= 5; j++) {
            var idx = j - 1
            var chked = $('#' + other_hospital_id + '_item' + i + '_p' + j).prop("checked")
            if (chked) {
                purposes[idx] = 'P' + j
            } else {
                purposes[idx] = ''
            }
        }

        var item_exp_date = $('#' + other_hospital_id + '_datepicker' + i).datepicker("getDate")
        var item_expire_ts = 0;

        //alert(exp_date)
        if (item_exp_date != null) {
            item_expire_ts = Math.round(+item_exp_date / 1000)
        }

        alert(item_id+" "+item_name+" "+purposes+" "+" "+item_expire_ts+" "+item_exp_date)


        //updateItemToSummaries(bytes32 hospital_requester, bytes32 hospital_provider,
        //                bytes32 item_id, bytes32 item_name, bytes32 [] purposes, uint provider_exp_time,
        //                uint item_exp_time)

        var txHashA = Summary.updateItemToSummaries(h_id, other_hospital_id, item_id, item_name, purposes, provider_expire_ts, item_expire_ts, {
            from: web3.eth.accounts[0],
            gas: 2000000
        }, function (err, txhash) {
            if (!err) {
                var theEvent = Summary.EventForUpdateToSummaries({
                    from: web3.eth.accounts[0]
                });
                theEvent.watch(function (err, event) {
                    if (!err) {
                        log('新增項目成功');
                        log(event);
                        theEvent.stopWatching();
                    } else {
                        log(err);
                    }
                });
            } else {
                log(err);
            }
        });
    }

}


function getItem(Summary, other_hospital_id) {

    var h_id = $('#hospital_id').val()

    //alert(h_id)
    //alert(other_hospital_id)

    for (i = 1; i <= 5; i++) {

        var _id = 'ITEM' + i
        var _name = 'ITEM' + i
        // function getItem(bytes32 hospital_requester, bytes32 hospital_provider, bytes32 item_id) constant returns(bytes32, bytes32 [], uint, uint)
        var fields = Summary.getItem(h_id, other_hospital_id, _id)
        var _itemname = fields[0]
        var _purposes = fields[1]
        var provider_exp_ts = fields[2]
        var item_exp_ts = fields[3]

        if (provider_exp_ts != 0) {
            var provider_expire_time = new Date(provider_exp_ts * 1000);
            $('#' + other_hospital_id + '_datepicker').datepicker("setDate", provider_expire_time)
        } else {
            $('#' + other_hospital_id + '_datepicker').datepicker("setDate", null)
        }

        if (_itemname.charAt(2) == '0' && _itemname.charAt(3) == '0' && _itemname.charAt(4) == '0') {
            for (x = 1; x <= 5; x++) {
                $('#' + other_hospital_id + '_item' + i + '_p' + x).prop("checked", false)
            }
            $("#" + other_hospital_id + "_datepicker" + i).datepicker("setDate", null)
            continue
        }

        for (j = 1; j <= 5; j++) {
            var idx = j - 1;
            var b_p = _purposes[idx];
            //alert(b_p);
            /*
            if (b_p == 'undefined') {
                $('#item'+i+'_p'+j).prop("checked",false);
            }
            */
            if (b_p.charAt(2) == '5' && b_p.charAt(3) == '0') {
                $('#' + other_hospital_id + '_item' + i + '_p' + j).prop("checked", true);
            } else {
                $('#' + other_hospital_id + '_item' + i + '_p' + j).prop("checked", false);
            }
        }

        if (item_exp_ts != 0) {
            var item_expire_time = new Date(item_exp_ts * 1000);
            $('#' + other_hospital_id + '_datepicker' + i).datepicker("setDate", item_expire_time)
        } else {
            $('#' + other_hospital_id + '_datepicker' + i).datepicker("setDate", null)
        }

    }

}


function deleteItem(Summary, hospital_id, other_hospital_id, _item_id) {

    // function removeItemFromSummaries(bytes32 hospital_requester, bytes32 hospital_provider, bytes32 item_id)
    var txHashA = Summary.removeItemFromSummaries(hospital_id, other_hospital_id, _item_id, {
        from: web3.eth.accounts[0],
        gas: 1000000
    }, function (err, txhash) {
        if (!err) {
            var theEvent = Summary.EventForRemoveFromSummaries({
                from: web3.eth.accounts[0]
            });
            theEvent.watch(function (err, event) {
                if (!err) {
                    log('刪除項目成功');
                    log(event);
                    theEvent.stopWatching();
                } else {
                    log(err);
                }
            });
        } else {
            log(err);
        }
    });

}

function String2Hex(tmp) {
    var str = '';
    for (var i = 0; i < tmp.length; i++) {
        str += tmp[i].charCodeAt(0).toString(16);
    }
    return str;
}

function getNonce() {

    var acc = $('#showpubkey').val();

    var nonce = eth.getTransactionCount(acc);
    alert("Nonce="+nonce+" , Account = "+acc);
    return nonce;
}


function updateItemToSummariesOffline(Summary,SummaryContractAddress,other_hospital_id) {


    //alert("hello")
    //alert(item_id)

    //var nonce_int = parseInt($('#data_Nonce').val());
    var nonce_int_1 = parseInt(getNonce());
    var nonce_hex_1 = '0x'.concat(nonce_int_1.toString(16));

    var nonce_int_2 = nonce_int_1 + 1;
    var nonce_hex_2 = '0x'.concat(nonce_int_2.toString(16));

    var nonce_int_3 = nonce_int_2 + 1;
    var nonce_hex_3 = '0x'.concat(nonce_int_3.toString(16));

    var nonce_int_4 = nonce_int_3 + 1;
    var nonce_hex_4 = '0x'.concat(nonce_int_4.toString(16));

    var nonce_int_5 = nonce_int_4 + 1;
    var nonce_hex_5 = '0x'.concat(nonce_int_5.toString(16));

    //alert("nonce = "+nonce_hex_1+" "+nonce_hex_2+" "+ nonce_hex_3 +" "+nonce_hex_4+" "+nonce_hex_5);

    //var h_id = $('#hospital_id').val();

    var provider_exp_date = $('#'+other_hospital_id+'_datepicker').datepicker("getDate")

    // var provider_expire_ts = 0;
    var hex_provider_exp_date = "00000000";

    var rlp = require("rlp");

    if(provider_exp_date != null) {

        var tmp_buf1 = rlp.encode(Math.round(+ provider_exp_date/1000));
        var tmp_str1 = tmp_buf1.toString("hex");

        hex_provider_exp_date = tmp_str1.substring(2);
    }

    var hex_paddle = "000000000000000000000000000000000000000000000000000000000000";

    var tx = [];

    for (i=1;i<=5;i++) {

        var item_id = 'ITEM'+i
        var item_name = 'ITEM'+i
        var hex_purposes = "";

        for (j=1;j<=5;j++) {
            var chked = $('#'+other_hospital_id+'_item'+i+'_p'+j).prop("checked")
            if(chked) {
                hex_purposes += String2Hex('P'+j);
                hex_purposes += hex_paddle;
            }else {
                hex_purposes += "0000"+ hex_paddle;
            }
        }

        //alert(hex_purposes);

        var item_exp_date = $('#'+other_hospital_id+'_datepicker' + i).datepicker("getDate")
        // var item_expire_ts = 0;
        var hex_item_exp_time = "00000000";

        //alert(exp_date)
        if(item_exp_date != null) {
            var tmp_buf2 = rlp.encode(Math.round(+ item_exp_date/1000));
            var tmp_str2 = tmp_buf2.toString("hex");
            hex_item_exp_time = tmp_str2.substring(2);
        }

        //alert(h_id+" "+other_hospital_id+" "+item_id+" "+item_name+" "+purposes+" "+provider_expire_ts+" "+item_expire_ts)

        //H1 h2 ITEM1 ITEM1 P1,P2,P3,P4,P5 1502640000 1502208000

        //updateItemToSummaries(bytes32 hospital_requester, bytes32 hospital_provider,
        //                bytes32 item_id, bytes32 item_name, bytes32 [] purposes, uint provider_exp_time,
        //                uint item_exp_time)

        // {"nonce":"0x4d",
        // "gasPrice":"0x04e3b29200",
        // "gasLimit":"0x0a9dcf",
        // "to":"0x8625c709f900cc1a1d312f0b38bc1c0165d6660a",
        // "value":"0x00",
        // "data":"0xee2040c7483100000000000000000000000000000000000000000000000000000000000048320000000000000000000000000000000000000000000000000000000000004954454d310000000000000000000000000000000000000000000000000000004954454d3100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000059907780000000000000000000000000000000000000000000000000000000005989e00000000000000000000000000000000000000000000000000000000000000000055b5031000000000000000000000000000000000000000000000000000000000050320000000000000000000000000000000000000000000000000000000000005033000000000000000000000000000000000000000000000000000000000000503400000000000000000000000000000000000000000000000000000000000050355d0000000000000000000000000000000000000000000000000000000000",
        // "chainId":1}

        //        "0xf9020b56850430e23400831e8480948625c709f900cc1a1d312f0b38bc1c0165d6660a80b901a4ee2040c7483100000000000000000000000000000000000000000000000000000000000068320000000000000000000000000000000000000000000000000000000000004954454d310000000000000000000000000000000000000000000000000000004954454d3100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000059907780000000000000000000000000000000000000000000000000000000005991c90000000000000000000000000000000000000000000000000000000000000000055031000000000000000000000000000000000000000000000000000000000000503200000000000000000000000000000000000000000000000000000000000050330000000000000000000000000000000000000000000000000000000000005034000000000000000000000000000000000000000000000000000000000000503500000000000000000000000000000000000000000000000000000000000025a097f5daf80df2ccb8f9a3e8cedebed7e51e01e410222a0d11a76e05202dab12efa0115f042ec6b6a3af4944dfcff3b91fdc2767c05593325aac0980bd6d1042187e"
        //        "0xf9020b56850430e23400831e8480948625c709f900cc1a1d312f0b38bc1c0165d6660a80b901a4ee2040c7483100000000000000000000000000000000000000000000000000000000000068320000000000000000000000000000000000000000000000000000000000004954454d310000000000000000000000000000000000000000000000000000004954454d3100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000059a43e000000000000000000000000000000000000000000000000000000000059a58f8000000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000000503200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005034000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026a0ab2640ca5b96459bbed73cd1f5e3b4649bcb4a30859944f0acde81f4611707f7a04c20f8137893787adacfa27bf2a9a008c7f714ce942cb498a7129377150336d7"
        //        "0xf9020c8183850430e23400831e8480948625c709f900cc1a1d312f0b38bc1c0165d6660a80b901a4ee2040c7483100000000000000000000000000000000000000000000000000000000000068320000000000000000000000000000000000000000000000000000000000004954454d310000000000000000000000000000000000000000000000000000004954454d3100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000059a6e1000000000000000000000000000000000000000000000000000000000059a6e10000000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000000503200000000000000000000000000000000000000000000000000000000000050330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026a0b385a3ce87fbd3b6ba2f8b5eff239dcea5191f8bd4df48d9151aea0940a7ac9aa00327247b74dac90500e5597d86f5aa456fabecbbe190747c784d54644a261dc6"
        //        "0xf9020b7e850430e23400831e8480948625c709f900cc1a1d312f0b38bc1c0165d6660a80b901a4ee2040c7483100000000000000000000000000000000000000000000000000000000000068320000000000000000000000000000000000000000000000000000000000004954454d310000000000000000000000000000000000000000000000000000004954454d3100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000000503200000000000000000000000000000000000000000000000000000000000050330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025a0a663060c24149d273de72a61415ffdcf6bb51c7f92425adf065e45ae2b334109a00410cb419ca363ce892427c974ce6c5e48fa838bd5b48180ab3857f2c130c8cf"
        //        "0xf9020c81b18504e3b29200830a9dcf948625c709f900cc1a1d312f0b38bc1c0165d6660a80b901a4ee2040c7483100000000000000000000000000000000000000000000000000000000000068350000000000000000000000000000000000000000000000000000000000004954454d310000000000000000000000000000000000000000000000000000004954454d3100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000059a43e000000000000000000000000000000000000000000000000000000000059a43e0000000000000000000000000000000000000000000000000000000000000000055031000000000000000000000000000000000000000000000000000000000000503200000000000000000000000000000000000000000000000000000000000050330000000000000000000000000000000000000000000000000000000000005034000000000000000000000000000000000000000000000000000000000000503500000000000000000000000000000000000000000000000000000000000026a0a1fe3a75cf76bb347372ef9c9239beb36c997808c961b01bde1642baca9770cba03e456710a31b67e03c01099b25b0c0a1e157a7624283985725831236a11cc0e2"
        //   "args": {
        //   "time": "1502127031",
        //    "owner_id_address": "0x0815e9a4bd1a27fcc057b541aea4df6fa283aa56",
        //    "hospital_requester": "0x4831000000000000000000000000000000000000000000000000000000000000",
        //    "hospital_provider": "0x6832000000000000000000000000000000000000000000000000000000000000",
        //    "item_id": "0x4954454d31000000000000000000000000000000000000000000000000000000",
        //    "item_name": "0x4954454d31000000000000000000000000000000000000000000000000000000",
        //    "purposes": [
        //    "0x5031000000000000000000000000000000000000000000000000000000000000",
        //    "0x5032000000000000000000000000000000000000000000000000000000000000",
        //    "0x5033000000000000000000000000000000000000000000000000000000000000",
        //    "0x5034000000000000000000000000000000000000000000000000000000000000",
        //    "0x5035000000000000000000000000000000000000000000000000000000000000"
        //],
        //    "provider_exp_time": "1502640000",
        //    "item_exp_time": "1502726400"

        var hex_head1 = "0xee2040c7";
        var hex_hostpital_requester = "4831";  // hardcoded as "H1" demo hospital
        var hex_paddle1 = "000000000000000000000000000000000000000000000000000000000000";
        var hex_hostpital_provider = String2Hex(other_hospital_id);
        var hex_paddle2a = "000000000000000000000000000000000000000000000000000000000000";
        var hex_item_id = String2Hex(item_id);
        var hex_paddle2b = "000000000000000000000000000000000000000000000000000000";
        var hex_item_name = String2Hex(item_name);
        var hex_paddle3 = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000"
        var hex_paddle4 = "00000000000000000000000000000000000000000000000000000000";
        var hex_paddle5 = "000000000000000000000000000000000000000000000000000000000000000";
        var hex_purposes_cnt = "5";

        var hex_data = hex_head1 + hex_hostpital_requester + hex_paddle1 + hex_hostpital_provider + hex_paddle2a + hex_item_id + hex_paddle2b + hex_item_name
            + hex_paddle3 + hex_provider_exp_date + hex_paddle4 + hex_item_exp_time + hex_paddle5 + hex_purposes_cnt + hex_purposes;

        //const privateKey = Buffer.from('ad77af99b808cc9dabf93176539ab39cbafed65bd36debc3a9695813eaa9c750', 'hex')
        const privateKey = Buffer.from($('#showprivkey').val(), 'hex')
        if(privateKey.length == 0) {
            alert("no private key!!")
            throw new Error("no private key!!");
            return
        }
        //alert("private key for signing txn :" + privateKey)

        /*** reproduce correct example */
        const Transaction = require("./index.js")

        var nonce_hex = eval("nonce_hex_"+i);

        const txParam = {
            nonce: nonce_hex,
            gasPrice: '0x04e3b29200',
            gasLimit: '0x0a9dcf',
            to: SummaryContractAddress,
            value: '0x0',
            data: hex_data,
            // EIP 155 chainId - mainnet: 1, ropsten: 3
            chainId: 1
        }

        tx[i-1] = new Transaction(txParam);
        tx[i-1].sign(privateKey);
        const serializedTx = tx[i-1].serialize();
        //alert(serializedTx);
        $('#h5_txn_signed_'+i).val('0x'.concat(serializedTx.toString("hex")));
    }

}

function openKeyFile(event) {

    var password = $('#inp_pass').val();

    if(password.length == 0) {
        alert("no password provided")
        //throw new Error("no password provided");
        return
    }

    const keythereum = require('keythereum')

    var files = event.target.files; // FileList object
    f = files[0];
    var reader = new FileReader();

    var JsonObj;

    reader.onload = (function(theFile) {
        return function(e) {

            var JsonObj = JSON.parse(e.target.result);

            var privateKey = keythereum.recover(password, JsonObj)

            if(privateKey.length == 0) {
                alert("decrypt failed! input password might be wrong!")
                //throw new Error("decrypt failed! input password might be wrong!");
                return
            }
            else {
                window.sessionStorage["private_key"] = privateKey;
                //alert(window.sessionStorage["private_key"])
                //alert("decrypt success!");
                //alert(privateKey.toString('base64'));
                //var publicKey = keythereum.privateKeyToAddress(privateKey);
                $('#showpubkey').val(keythereum.privateKeyToAddress(privateKey));
                $('#showprivkey').val(privateKey.toString('hex'));
            }

            //setTimeout(function() { alert("start decrypting .... "); }, 3000);

        };
    })(f);

    //log(JsonObj);

    reader.readAsText(f);


}


function sendRawTxn(Summary) {

    for(i=1;i<=5;i++)
    {
        var tx_hash = eth.sendRawTransaction($('#h5_txn_signed_' + i).val()
            , function (err, txhash) {
                if (!err) {
                    var theEvent = Summary.EventForUpdateToSummaries({
                        from: eth.accounts[0],
                    });
                    theEvent.watch(function (err, event) {
                        if (!err) {
                            log(event);
                            theEvent.stopWatching();
                        } else {
                            log(err);
                        }
                    });
                } else {
                    log(err);
                }
            }
        );
    }
}
