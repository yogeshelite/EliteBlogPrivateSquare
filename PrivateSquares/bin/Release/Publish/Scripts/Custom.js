$(document).ready(function () {
    $('#fileImage').on('change', function () {
        display(this);
        ImageContent(this);
    });
});
var PhoneliArr = [];
var EmailliArr = [];
var AddliArr = [];
var ClearCrossEmail = function (index) {
    EmailliArr.splice(index, 1);
    BindEmailAdd();
};
var ClearCrossPhone = function (index) {
    PhoneliArr.splice(index, 1);
    BindPhoneAdd();
};
var ClearCrossAddress = function (index) {
    AddliArr.splice(index, 1);
    BindAddressAdd();
};
var counter = 0;
var EmailAdd = function () {
    var email = $('#txtemail').val();
    if (email === "") {
        alert("Pls insert value of email");
        return;
    }
    var DataArr = [];
    DataArr["Value"] = email;
    EmailliArr.push(DataArr);
    counter++;
    BindEmailAdd();
};
var BindEmailAdd = function () {

    var li = "";
    $('#ulEmailSpan').html("");

    for (i = 0; i < EmailliArr.length; i++) {

        li += '<li id="li' + EmailliArr[i].counter + '"><a href="#" class="empty close_bt" onclick="ClearCrossEmail(' + i + ')">×</a><span id="span">' + EmailliArr[i].Value + '</span></li>';
    }
    $('#ulEmailSpan').html(li);
};
var Phonecounter = 0;
var PhoneAdd = function () {

    phone = $('#txtphno').val();

    if (phone === "") {
        alert("Pls insert value of phoneno");
        return;
    }
    var DataArr = [];

    DataArr["Value"] = phone;
    PhoneliArr.push(DataArr);
    Phonecounter++;

    BindPhoneAdd();
};
var BindPhoneAdd = function () {
    $('#ulPhoneSpan').html("");
    var li = "";
    for (i = 0; i < PhoneliArr.length; i++) {

        li += '<li><a href="#" class="empty close_bt" onclick="ClearCrossPhone(' + i + ')">×</a><span id="span' + PhoneliArr[i].counter + '">' + PhoneliArr[i].Value + '</span></li>';
    }
    $('#ulPhoneSpan').html(li);
};
var Addresscounter = 0;
var AddressAdd = function () {

    var street = $('#txtstreet').val();
    var city = $('#txtcity').val();
    var state = $('#txtstate').val();
    var country = $('#ddlcountry').val();


    if (street === "" || city === "" || state === "" || country === "") {
        alert("Pls insert value of Address");
        return;
    }
    //ar DataArr = [];
    var AddData = {};
    AddData["Street"] = street;
    AddData["City"] = city;
    AddData["State"] = state;
    AddData["Country"] = country;


    //DataArr["Value"] = AddData;

    AddliArr.push(AddData);
    Addresscounter++;
    BindAddressAdd();

};
var BindAddressAdd = function () {
    $('#ulAddSpan').html("");
    var li = "";
    li += '<table class="table" style="border:1px solid black;height:auto;width:auto;">' +
        '<thead style="border:1px solid black;">' +
        '<tr>' +
        '<th>Srno.</th>' +
        '<th>Street</th>' +
        '<th>City</th>' +
        '<th>State</th>' +
        '<th>Country</th>' +
        '<th>Action</th>' +
        '</tr>' +
        '</thead > ' +
        '<tbody>';

    $.each(AddliArr, function (n) {
        var srno = n + 1;
        li += '<tr>' +
            '<td>' + srno + '</td>' +
            '<td>' + this.Street + '</td>' +
            '<td>' + this.City + '</td>' +
            '<td>' + this.State + '</td>' +
            '<td>' + this.Country + '</td>' +
            '<td><a href="#" class="empty tblclose_bt" onclick="ClearCrossAddress(' + n + ')">×</a></td>' +
            '</tr>';
    });
    li += '</tbody></table>';
    $('#ulAddSpan').html(li);
};
var validation = function (opname, formname) {
    var IsValid = false;
    var FirstName = $('#txtfirstname').val();
    var LastName = $('#txtlastname').val();

    if (FirstName === "" || LastName === "") {
        $('#ErrlblFirstName').text('Enter First Name or Last Name').css("color", "red");
    }
    if (FirstName !== "" || LastName !== "") {
        IsValid = true;
    }

    if (IsValid === true) {
        if (formname === "contact") {
            saveContact(opname);
        }
        else {
            saveProfile(opname);
        }
    }

    //var email = $('#txtemail').val();
    //var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //if (!regex.test(email)) {
    //    $('#ErrlblEmail').html("Enter a Valid email");
    //    IsValid = false;
    //} else {
    //    IsValid = true;
    //}
};
var userprofile;
var EditUserdata;
var AllContactList;
var AllContactListAdd;
var LoginCookieName = "Login=";
var UserId = document.cookie.substring(document.cookie.indexOf(LoginCookieName) + LoginCookieName.length);
var CategoryArr = [];
function display(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            $('#Uploadimg').attr('src', event.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
var base64;
var ImageContent = function (input) {

    if (input.files) {
        var filesAmount = input.files.length;
        var filedetail = input.files;
        imageType = input.files[0].type;
        imageType = imageType.substring(imageType.indexOf('/') + 1);
        var reader = new FileReader();
        reader.onload = function (event) {
            base64 = event.target.result;
            base64 = base64.replace(/^data:image\/(png|jpg|jpeg|gif|tiff|pjp|pjpeg|jfif|tif|svg|bmp|svgz|webp|ico|xbm|dib|pdf);base64,/, "");
            //base64 = base64.replace(/^data:application\/(png|jpg|jpeg|gif|tiff|pjp|pjpeg|jfif|tif|svg|bmp|svgz|webp|ico|xbm|dib|pdf);base64,/, "");
            //base64 = base64.replace(/^data:application\/(vnd.openxmlformats-officedocument.spreadsheetml.sheet);base64,/, "");
        };

        reader.readAsDataURL(input.files[0]);
        // imageType = base64.substring(base64.lastIndexOf('.') + 1);
    }
};
function saveProfile() {
    var pro = {};
    pro.Image = base64;
    pro.Id = $('#userid').val();
    pro.UId = $('#uid').val();
    pro.FirstName = $('#txtfirstname').val();
    pro.LastName = $('#txtlastname').val();
    pro.Company = $('#txtcompany').val();
    pro.JobTitle = $('#txtjob').val();
    pro.Note = $('#txtnotes').val();
    var email = "";
    var phone = "";
    var addrs = [];
    for (e = 0; e < EmailliArr.length; e++) {
        email += EmailliArr[e].Value + ',';
    }

    pro.Email = email.slice(0, -1);

    for (p = 0; p < PhoneliArr.length; p++) {
        phone += PhoneliArr[p].Value + ',';
    }
    pro.PhoneNo = phone.slice(0, -1);
    pro.CustomAddresses = AddliArr;
    pro.GroupId = CategoryArr;

    var request = pro;

    $.ajax({
        type: "POST",
        url: "/Home/AddProfile",
        data: request,
        dataType: "json",
        success: function () {
            alert("Data has been added successfully.");

        },
        error: function () {
            alert("Error while inserting data");
        }
    });
}
var Empty = function () {
    $('.empty').val("");
    $('#ddlcountry').val(0);
    $('input[type="checkbox"]').each(function () {

        if ($(this).prop('checked') === true) {
            $(this).prop('checked') === false;
        }
    });
};
var con = {};
function saveContact(btnvalue) {
    con.Image = base64;
    con.FirstName = $('#txtfirstname').val();
    con.LastName = $('#txtlastname').val();
    con.Company = $('#txtcompany').val();
    con.JobTitle = $('#txtjob').val();
    con.Note = $('#txtnotes').val();
    var email = "";
    var phone = "";

    con.Addresses = AddliArr;
    con.GroupId = CategoryArr;
    var request = con;
    if (btnvalue === "Submit") {
        for (e = 0; e < EmailliArr.length; e++) {
            email += EmailliArr[e].Value + ',';
        }
        con.Email = email.slice(0, -1);

        for (p = 0; p < PhoneliArr.length; p++) {
            phone += PhoneliArr[p].Value + ',';
        }
        con.PhoneNo = phone.slice(0, -1);

        con.CustomAddresses = AddliArr;

        con.Id = $('#userid').val();
        con.OwnerId = $('#uid').val();
        $.ajax({
            type: "POST",
            url: "/Home/AddContact",
            data: request,
            dataType: "json",
            success: function () {
                alert("Data has been added successfully.");
                Empty();
            },
            error: function () {
                alert("Error while inserting data");
            }
        });
    }

    if (btnvalue === "Update") {

        for (e = 0; e < CustomerEmailArr.length; e++) {
            email += CustomerEmailArr[e] + ',';
        }
        con.Email = email.slice(0, -1);

        for (p = 0; p < CustomerPhoneArr.length; p++) {
            phone += CustomerPhoneArr[p] + ',';
        }
        con.PhoneNo = phone.slice(0, -1);

        con.CustomAddresses = CustomerAddrsArr;

        con.Id = EditUserdata[0].Id;
        con.UId = EditUserdata[0].UId;
        con.OwnerId = EditUserdata[0].OwnerId;
        con.AddId = EditUserdata[0].Addresses[0].Id;
        con.UserId = EditUserdata[0].Addresses[0].UserId;
        request = con;
        $.ajax({
            type: "POST",
            url: "/Home/EditContact",
            data: request,
            dataType: "json",
            success: function () {
                alert("Data has been Updated successfully.");

            },
            error: function () {
                alert("Error while inserting data");
            }
        });
    }
}
var selectgroup = function () {
    CategoryArr = [];

    $('input[type="checkbox"]:checked').each(function () {
        group = $(this).val();
        CategoryArr.push(group);
    });

    //$('input[type="checkbox"]').each(function () {
    //    if ($(this).prop('checked') === true) {
    //        group = $(this).val();
    //        if (group !== 'on') {
    //            CategoryArr.push(group);

    //        }
    //    }
    //});
};
var getlist = function (name, grpid) {
    var div = '';
    $('#divContact').html("");
    $.ajax({
        type: "POST",
        url: "/Home/ContactsList",
        data: { "GroupId": grpid },
        dataType: "json",
        success: function (response) {
            var list = response;
            $('#sideallcontact').removeClass('active');
            $('#hotlist').removeClass('active');
            $('#business,#sidebarbusiness').removeClass('active');
            $('#family,#sidebarfamily').removeClass('active');
            $('#friend,#sidebarfriend').removeClass('active');
            if (name === "AllContact")
                $('#sideallcontact').addClass('active');
            if (name === "Friends")
                $('#friend,#sidebarfriend').addClass('active');
            if (name === "Family")
                $('#family,#sidebarfamily').addClass('active');
            if (name === "Business")
                $('#business,#sidebarbusiness').addClass('active');
            if (name === "HotList")
                $('#hotlist').addClass('active');
            if (response !== null) {
                for (i = 0; i < list.length; i++) {
                    var FirstEmail = list[i].Email.split(',')[0];
                    var fullname = list[i].FirstName + " " + list[i].LastName;
                    div += '<div class="col-sm-6 col-lg-4">' +
                        '<div class="card-contact">' +
                        '<div class="tx-center">';

                    if (list[i].ImageBase64 !== "" && list[i].ImageBase64 !== null) {
                        div += '<img src="data:image/jpg;base64,' + list[i].ImageBase64 + '"class="card-img">';
                    }
                    else {
                        div += '<img src="../Images/default-image.png" class="card-img">';
                    }

                    div += '<h5 class="mg-t-10 mg-b-5"><a class="contact-name" id="">' + fullname + '</a></h5>' +

                        '<p>' + list[i].JobTitle + '</p>' +
                        '<p class="contact-social">' +
                        '<a href="https://facebook.com"><i class="fa fa-facebook"></i></a>' +
                        '<a href="http://twitter.com/"><i class="fa fa-twitter"></i></a>' +
                        '<a href="http://www.google.com"><i class="fa fa-google"></i></a>' +
                        '</p >' +
                        '</div >' +

                        '<p class="contact-item">' +
                        '<span>Phone:</span>' +
                        '<span>' + list[i].PhoneNo + '</span>' +
                        '</p>' +
                        '<p class="contact-item">' +
                        '<span>Email:</span>' +
                        '<a>' + list[i].Email + '</a>' +
                        '</p>' +
                        '<p class="contact-item">' +
                        '<span>URL:</span>' +
                        '<a href="">http://thmpxls.me</a>' +
                        '</p>' +
                        '<p class="contact-item">' +

                        '<a href = "/Home/AddContact/' + list[i].UId + '" name="Contact">Edit</a>' +

                        '<a name="' + FirstEmail + '" onclick="showmodalChangeOwner(name,' + list[i].UId + ');">Chnage Owner</a>' +

                        '<a onclick="showmodalDel(' + list[i].UId + ');">Delete</a>' +

                        '</p>' +
                        '</div>' +
                        '</div>';
                    $('#divContact').html(div);
                }
            }
            //else {
            //    $('#divdatanotfound').html("Data Not Found").css({ "color": "red", "font-size": "200%", "margin-top": "200px", "margin-left": "100px" });
            //}
        },
        error: function (response) {
            alert("Error while getting data");
        }
    });
};
//#region Profile
var Profile = function () {
    var div = '';
    $.ajax({
        type: "POST",
        url: "/Home/UserProfile",
        dataType: "json",
        success: function (response) {
            var list = response;
            for (i = 0; i < list.length; i++) {
                if (list[i].GroupId === 0 && list[i].UId === parseInt(UserId)) {
                    $('#lblprofilename').text(list[i].FirstName);
                    if (list[i].ImageBase64 !== "" && list[i].ImageBase64 !== null) {
                        div += '<img src="data:image/jpg;base64,' + list[i].ImageBase64 + '"class="card-img">';
                    }
                    else {
                        div += '<img src="../Images/default-image.png" class="card-img">';
                    }
                    $('#profileimg').html(div);
                }
            }

        },
        error: function (response) {
            alert("Error while getting data Profile() fun");
        }
    });
};
//#endregion Profile
var getlistcount = function () {
    $.ajax({
        type: "post",
        url: "/home/countcontacts",
        datatype: "json",
        success: function (response) {
            var list = response;
            $("#countallcontact").text(response[0]);
            $("#totalfriends").text(response[1]);
            $("#totalfamily").text(response[2]);
            $("#totalbusiness").text(response[3]);
        },
        error: function (response) {
            alert("error while getting data");
        }
    });
};
var customerdata = [];
function emailCrossbtn1() {
    alert("emailCrossbtn1");
}
//#region EditContact
var EditContact = function (btnval) {
    var url = document.URL;
    id = url.substring(url.lastIndexOf('/') + 1);
    $.ajax({
        type: "POST",
        url: "/Home/GetEditContactdata",
        data: { "id": id },
        dataType: "json",
        success: function (response) {
            EditUserdata = response;
            BindEditCustomer();

        },
        error: function (response) {
            //alert("Error while getting data");
        }
    });
    AddEditBtnValue = "Edit";
    localStorage.setItem("AddEditBtnValue", AddEditBtnValue);
};
var CustomerEmailArr = [];
var CustomerPhoneArr = [];
var CustomerAddrsArr = [];
var BindEditCustomer = function () {
    $("#txtfirstname").val(EditUserdata[0].FirstName);
    $("#txtlastname").val(EditUserdata[0].LastName);
    $("#txtcompany").val(EditUserdata[0].Company);
    $("#txtnotes").val(EditUserdata[0].Note);
    $("#txtjob").val(EditUserdata[0].JobTitle);
    $("#Uploadimg").attr("src", "data:image/jpg;base64," + EditUserdata[0].ImageBase64);

    //var GroupId = EditUserdata[0].GroupId;
    ////var GroupIds = [];
    ////GroupIds = GroupId.split(',');
    ////for (grp = 0; grp < GroupIds.length; grp++) {
    //$('input[type="checkbox"]').each(function () {
    //    if ($(this).val() === GroupIds) {
    //        $(this).prop('checked', true);
    //    }
    //    //});
    //}

    var Email = EditUserdata[0].Email;
    if (Email === null || Email === "") {
        $('#divEmailSpan').html("");
    }
    else {
        CustomerEmailArr = [];
        CustomerEmailArr = Email.split(',');
        var EmailLi = "";
        $('#ulEmailSpan').html("");
        $.each(CustomerEmailArr, function (n) {
            EmailLi += '<li id="li"><a href="#" class="empty close_bt"  onclick="ClearCrossEditEmail(' + n + ')">×</a><span name="Email" style="cursor:pointer;"  title="Click to Edit" class="editable" id="Email' + n + '" onclick="Convert(this, \'Email\');">' + CustomerEmailArr[n] + '</span></li>';
        });
        //<a href="#" title="Edit" class="fa fa-edit" onclick="Convert();">
        $('#ulEmailSpan').html(EmailLi);
    }
    var Phone = EditUserdata[0].PhoneNo;
    if (Phone === null || Phone === "") {
        $('#divPhoneSpan').html("");
    }
    else {
        CustomerPhoneArr = [];
        CustomerPhoneArr = Phone.split(',');
        var Phnli = "";
        $('#ulPhoneSpan').html("");
        $.each(CustomerPhoneArr, function (n) {
            Phnli += '<li id="li"><a href="#" class="empty close_bt"  onclick="ClearCrossEditPhone(' + n + ')">×</a><span name="Phone" style="cursor:pointer;"  title="Click to Edit" class="editable" id="Phone' + n + '" onclick="Convert(this, \'Phone\');">' + CustomerPhoneArr[n] + '</span></li>';
        });
        $('#ulPhoneSpan').html(Phnli);
    }

    CustomerAddrsArr = EditUserdata[0].Addresses;
    if (CustomerAddrsArr === null || CustomerAddrsArr === "") {
        $('#divAddSpan').html();
    }
    else {
        var Addli = "";
        $('#ulAddSpan').html("");
        Addli += '<table class="table" style="border:1px solid black;height:auto;width:auto;">' +
            '<thead style="border:1px solid black;">' +
            '<tr>' +
            '<th>Srno.</th>' +
            '<th>Street</th>' +
            '<th>City</th>' +
            '<th>State</th>' +
            '<th>Country</th>' +
            '<th>Action</th>' +
            '</tr>' +
            '</thead ><tbody>';

        $.each(CustomerAddrsArr, function (n) {

            var srno = n + 1;
            var EditAddressArr = [];
            EditAddressArr = CustomerAddrsArr[n];
            Addli += '<tr>' +
                '<td>' + srno + '</td>' +
                '<td>' + this.Street + '</td>' +
                '<td name="City">' + this.City + '</td>' +
                '<td name="State">' + this.State + '</td>' +
                '<td name="Country">' + this.Country + '</td>' +
                '<td><span class="editaddrs fa fa-edit" onclick="ShowModalEditAddress(' + n + ');"></span><a href="#" class="empty tblclose_bt" onclick="ClearCrossEditAddrs(' + n + ')">×</a></td>' +
                '</tr>';
        });
        Addli += '</tbody></table>';
        $('#ulAddSpan').html(Addli);
    }
};
var ShowModalEditAddress = function (arrindex) {
    $('#Updatebtnid').val(arrindex);
    $('#mdltxtstreet').val(CustomerAddrsArr[arrindex].Street);
    $('#mdltxtcity').val(CustomerAddrsArr[arrindex].City);
    $('#mdltxtstate').val(CustomerAddrsArr[arrindex].State);
    $("#mdlddlcountry").val(CustomerAddrsArr[arrindex].Country);
    $('#EditAddressModal').modal('show');
};
var UpdateAddress = function () {
    var indexofarr = $('#Updatebtnid').val();
    CustomerAddrsArr[indexofarr].Street = $('#mdltxtstreet').val();
    CustomerAddrsArr[indexofarr].City = $('#mdltxtcity').val();
    CustomerAddrsArr[indexofarr].State = $('#mdltxtstate').val();
    CustomerAddrsArr[indexofarr].Country = $('#mdlddlcountry').val();
    var Addli = "";
    $('#ulAddSpan').html("");
    Addli += '<table class="table" style="border:1px solid black;height:auto;width:auto;">' +
        '<thead style="border:1px solid black;">' +
        '<tr>' +
        '<th>Srno.</th>' +
        '<th>Street</th>' +
        '<th>City</th>' +
        '<th>State</th>' +
        '<th>Country</th>' +
        '<th>Action</th>' +
        '</tr>' +
        '</thead ><tbody>';
    $.each(CustomerAddrsArr, function (n) {
        var srno = n + 1;
        var EditAddressArr = [];
        EditAddressArr = CustomerAddrsArr[n];
        Addli += '<tr>' +
            '<td>' + srno + '</td>' +
            '<td>' + this.Street + '</td>' +
            '<td name="City">' + this.City + '</td>' +
            '<td name="State">' + this.State + '</td>' +
            '<td name="Country">' + this.Country + '</td>' +
            '<td><span class="editaddrs fa fa-edit" onclick="ShowModalEditAddress(' + n + ');"></span><a href="#" class="empty tblclose_bt" onclick="ClearCrossEditAddrs(' + n + ')">×</a></td>' +
            '</tr>';
    });
    Addli += '</tbody></table>';
    $('#ulAddSpan').html(Addli);
    $('#EditAddressModal').modal('hide');
};
var ClearCrossEditEmail = function (index) {
    CustomerEmailArr.splice(index, 1);
    var EmailLi = "";
    $('#ulEmailSpan').html("");
    $.each(CustomerEmailArr, function (n) {
        EmailLi += '<li id="li"><a href="#" class="empty close_bt" onclick="ClearCrossEditEmail(' + n + ')">×</a><span name="Email" style="cursor:pointer;"  title="Click to Edit" class="editable" id="Email' + n + '" onclick="Convert(this, \'Email\');">' + CustomerEmailArr[n] + '</span></li>';
    });
    //<a href="#" title="Edit" class="fa fa-edit" onclick="Convert();">
    $('#ulEmailSpan').html(EmailLi);
};
var ClearCrossEditPhone = function (index) {
    CustomerPhoneArr.splice(index, 1);
    var Phnli = "";
    $('#ulPhoneSpan').html("");
    $.each(CustomerPhoneArr, function (n) {
        Phnli += '<li id="li"><a href="#" class="empty close_bt" onclick="ClearCrossEditPhone(' + n + ')">×</a><span name="Phone" style="cursor:pointer;"  title="Click to Edit" class="editable" id="Phone' + n + '" onclick="Convert(this, \'Phone\');">' + CustomerPhoneArr[n] + '</span></li>';
    });
    $('#ulPhoneSpan').html(Phnli);
};
var ClearCrossEditAddrs = function (index) {
    CustomerAddrsArr.splice(index, 1);
    var Addli = "";
    $('#ulAddSpan').html("");
    Addli += '<table class="table" style="border:1px solid black;height:auto;width:auto;">' +
        '<thead style="border:1px solid black;">' +
        '<tr>' +
        '<th>Srno.</th>' +
        '<th>Street</th>' +
        '<th>City</th>' +
        '<th>State</th>' +
        '<th>Country</th>' +
        '<th>Action</th>' +
        '</tr>' +
        '</thead><tbody>';

    $.each(CustomerAddrsArr, function (n) {
        var srno = n + 1;
        Addli += '<tr>' +
            '<td>' + srno + '</td>' +
            '<td id="Addrs' + n + '" onclick="Convert(this, \'Addrs\');">' + this.Street + '</td>' +
            '<td>' + this.City + '</td>' +
            '<td>' + this.State + '</td>' +
            '<td>' + this.Country + '</td>' +
            '<td><span class="editaddrs fa fa-edit" onclick="ShowModalEditAddress(' + n + ');"></span><a href="#" class="empty tblclose_bt" onclick="ClearCrossEditAddrs(' + n + ')">×</a></td>' +
            '</tr>';
    });
    Addli += '</tbody></table>';
    $('#ulAddSpan').html(Addli);
};
var BindEditProfile = function (data) {
    $("#txtfirstname").val(data[0].FirstName);
    $("#txtlastname").val(data[0].LastName);
    $("#txtcompany").val(data[0].Company);
    $("#txtjob").val(data[0].JobTitle);
    $("#txtnotes").val(data[0].Note);
    $("#Uploadimg").attr("src", "data:image/jpg;base64," + data[0].ImageBase64);

    var Email = data[0].Email;

    if (Email === null || Email === "") {
        $('#divEmailSpan').html("");
    }
    else {
        var emailArr = [];
        emailArr = Email.split(',');
        var EmailLi = "";
        $('#ulEmailSpan').html("");
        $.each(emailArr, function (n) {
            EmailLi += '<li id="li"><a href="#" class="empty close_bt" onclick="ClearCrossEmail(' + n + ')">×</a><span style="cursor:pointer;"  title="Click to Edit" class="editable" id="lblName" onclick="Convert();">' + emailArr[n] + '</span></li>';
        });
        $('#ulEmailSpan').html(EmailLi);
    }

    var Phone = data[0].PhoneNo;
    if (Phone === null || Phone === "") {
        $('#divPhoneSpan').html("");
    }
    else {
        var phnArr = [];
        phnArr = Phone.split(',');
        var Phnli = "";
        $('#ulPhoneSpan').html("");
        $.each(phnArr, function (n) {
            Phnli += '<li id="li"><a href="#" class="empty close_bt" onclick="ClearCrossEmail(' + n + ')">×</a><span style="cursor:pointer;"  title="Click to Edit" class="editable" id="lblName" onclick="Convert();">' + phnArr[n] + '</span></li>';
        });
        $('#ulPhoneSpan').html(Phnli);
    }

    var address = [];
    address = data[0].Addresses;
    if (address === null || address === "") {
        $('#divAddSpan').html();
    }
    else {
        var Addli = "";
        $('#ulAddSpan').html("");
        $.each(address, function (n) {
            Addli += '<li><a href="#" class="empty close_bt" onclick="ClearCrossAddress(name,' + n + ')">×</a><span>' + this.Street + ',' + this.City + ',' + this.State + ',' + this.Country + '</span></li>';
        });
        $('#ulAddSpan').html(Addli);
    }
};
//#endregion Edit
//#region EditProfile
var profiledata = [];
var AllContact;
var EditProfile = function () {
    var url = document.URL;
    id = url.substring(url.lastIndexOf('/') + 1);

    $.ajax({
        type: "POST",
        url: "/Home/ContactsList",
        dataType: "json",
        success: function (response) {
            //var list = response;
            AllContact = response;
        },
        error: function (response) {
            alert("Error while getting data");
        }
    });
    AddEditBtnValue = "Edit";
    localStorage.setItem("AddEditBtnValue", AddEditBtnValue);
    contact = $.grep(AllContact.list, function (n, i) {
        return n.Id === id;
    });
    contactAdd = $.grep(AllContact.listAdd, function (n) {
        return n.UserId === id;
    });

    profiledata[contact] = contact;
    profiledata[contactAdd] = contactAdd;
    SetEditProfile(customerdata);
};
//#endregion
var SetEditProfile = function (profiledata) {
    localStorage.setItem("contact", null);
    localStorage.setItem("contact", JSON.stringify(profiledata));
    window.location.href = "/Home/Myprofile";
};
var showmodalChangeOwner = function (email, id) {
    $("#lblEmail").text(email);
    //$("#lblEmail").html(email);
    $("#userID").val(id);
    $('#ChnageOwnerModal').modal('show');
};
var emailpass;
var ChangeOwner = function () {
    //var Tomail = $("#lblEmail").html(email);
    var chg = {};
    chg.Email = $('#lblEmail').html();
    chg.Password = $('#txtPassword').val();
    chg.Id = $('#userID').val();
    var request = chg;
    $.ajax({
        type: "POST",
        url: "/Home/ChangeOwner",
        data: request,
        dataType: "json",
        success: function (response) {
            emailpass = response.rg;
            if (response.status === false) {
                alert("Already exist accopunt");
                return;
            }
            else {
                Mail();
            }
        },
        error: function (response) {
            alert("Error while getting data");
        }
    });


};
var Mail = function () {
    $.ajax({
        type: "POST",
        url: "/Home/UserProfile",
        dataType: "json",
        success: function (response) {
            SendMail(response);
        },
        error: function (response) {
            alert("Error while getting data");
        }
    });
};
var SendMail = function (data) {
    var pass = emailpass.Password;
    var FirstEmail = emailpass.Email;
    var em = {};
    em.FromName = data[0].FirstName;
    em.FromEmail = FirstEmail;
    em.Tomail = $('#lblEmail').html();
    em.Message = 'Your Email is:\n' + FirstEmail + 'Your Password is:\n' + pass + 'Link for login is:\n/Home/Login';
    var request = em;
    $.ajax({
        type: "POST",
        url: "/Home/Mail",
        data: request,
        dataType: "json",
        success: function (response) {
        },
        error: function (response) {
            alert("Error while send Mail");
        }
    });
};
//#region Delete
var showmodalDel = function (id) {
    $("#ContactId").val(id);
    $('#deleteModal').modal('show');
};
var DeleteContact = function () {
    var id = $("#ContactId").val();
    var request = JSON.stringify(id);
    $.ajax({
        type: "POST",
        url: "/Home/RemoveContact",
        //data: id,
        data: { "id": id },
        dataType: "json",
        success: function () {
            alert("Data has been deleted successfully.");
            window.location.href = "/Home/Contacts";
        },
        error: function () {
            alert("Error while inserting data");
        }
    });
};
//#endregion
var BtnShowHide = function () {
    var AddEditBtn = localStorage.getItem('AddEditBtnValue');
    if (AddEditBtn === "Edit") {
        $('#btnupdatecont').show();
        $('#btnsavecont').hide();
    }
    if (AddEditBtn === "Add") {
        $('#btnupdatecont').hide();
        $('#btnsavecont').show();
    }
};
var newEditedvalue;
var SpanName;
var Convert = function (elm, type) {
    $('#controlerid').val();
    var lbl = $("#" + elm.id);

    var input = document.createElement('input');
    input.type = 'text';
    input.name = 'txtedit';
    input.id = "txt" + elm.id;
    input.value = lbl.text();
    lbl.after(input);
    //lbl.after('<input type="text" value="dummy"/>');
    lbl.removeClass("show");
    lbl.addClass("hidden");
    $("#" + input.id).on("blur", function () {

        EditText(this.id, type, this, lbl[0].id);

    });
    $("#" + input.id).show();
};
var EditText = function (index, controlType, control, lblid) {
    index = index.replace(controlType, "").replace("txt", "");
    $("#" + lblid).text(control.value);
    $("#" + lblid).removeClass("hidden");
    $("#" + lblid).addClass("show");
    if (controlType === "Email") {
        CustomerEmailArr[index] = control.value;
    }
    else if (controlType === "Phone") {
        CustomerPhoneArr[index] = control.value;
    }
    //else {
    //    var alll = control.attr('name');
    //    if (control.Attribute.name === "Street") {
    //        CustomerAddrsArr[index].Street = control.value;
    //    }
    //}
    control.remove();
};

var AddNewContact = function () {
    localStorage.setItem("AddEditBtnValue", null);
    AddEditBtnValue = "Add";
    localStorage.setItem("AddEditBtnValue", AddEditBtnValue);
};