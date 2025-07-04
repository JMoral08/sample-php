$(document).ready(function(){

var Init = {
    label_user          : $("#lbl-user"),
    label_users         : $("#lbl-users"),
    tbody_account       : $("#tbody-account")
};
// getData();

function getData() {
    var $self = Init;
    var output = '';
    $.ajax({
        url: 'controller/statementofaccount/viewaccount.php',
        type: 'post',
        dataType: 'json',
        success:function(data) {
            // console.log(data);
            for (i=0; i<data.length; i++) {
                output += "<tr id='"+data[i].id+"'>"+
                        "<td class='text-center'>"+data[i].id+"</td>"+
                        "<td class='text-uppercase'><h6>"+data[i].productname+"</h6> <small class='text-muted text-lowercase'>"+data[i].date_created+"</small> </td>"+
                        "<td>"+data[i].amount+"</td>"+
                        "<td class='text-end'>"+data[i].quantity+"</td>"+
                        "<td>"+data[i].total_amount+"</td>"+
                        "<td class='text-center'>"+data[i].customer+"</td>"+
                        "<td class='text-success text-center'>Paid</td>"+
                        "</tr>"
            }
            $self.tbody_account.html(output);
        }
    });
}


});