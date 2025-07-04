$(document).ready(function(){

let Init = {
    form_liabilities        : $("#form-liabilities"),
    text_customername       : $("#txt-customername"),
    text_dateofterms        : $("#txt-dateofterms"),
    label_user              : $("#lbl-user"),
    label_users             : $("#lbl-users"),
    button_search_customer  : $("#btn-search-customer"),
    button_update           : $("#btn-update"),
    tbody_customer          : $("#tbody-customer")
};
Init.button_search_customer.on('click', searchCustomer);
Init.button_update.on('click', updateData);

function FormCancel() {
    let $self = Init;
        $self.form_liabilities[0].reset();
}

function searchCustomer() {
    let $self = Init;
    let output = '';
    let totalqty = 0;
    let totalamount = 0;
    let data = {
        'action'        : 'search',
        'customername'  : $self.text_customername.val(),
        'dateofterms'   : $self.text_dateofterms.val()
        
    };
    if($self.text_customername.val() == '' ) {
        $self.text_customername.focus();
    } else {
        $.ajax({
            url: 'model/liabilities.php',
            type: 'post',
            data: data,
            dataType: 'json',
            success:function(data) {
                console.log(data);
                for(i=0; i<data.length; i++) {
                    output +="<tr data-id='"+data[i].id+"'>"+
                        "<td class='text-uppercase'>"+data[i].customer+"</td>"+
                        "<td class='text-uppercase'>"+data[i].productname+"</td>"+
                        "<td>"+data[i].amount+"</td>"+
                        "<td data-target='td-quantity'>"+data[i].quantity+"</td>"+
                        "<td data-target='td-total-amount'>"+data[i].total_amount+"</td>"+
                        "<td class='table-active'>"+data[i].date_today+"</td>"+
                        "</tr>";
                }
                $self.tbody_customer.html(output);
                $("td[data-target=td-quantity]").each(function(){
                    totalqty += parseFloat($(this).text());
                });
                $('#td-total-qty').text(+totalqty.toFixed(2));

                $("td[data-target=td-total-amount]").each(function(){
                    totalamount += parseFloat($(this).text());
                });
                $('#td-overalltotal').text(+totalamount.toFixed(2)); 
            }
        });
    }
}
function updateData() {
    let $self = Init;
    $('#tbody-customer tr').each(function() {
        let id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            url: 'model/liabilities.php',
            type: 'post',
            data: {'action' : 'update', id : id},
            success:function(data) {
                console.log(data);
                FormCancel();
                $self.tbody_customer.empty();
                $('#td-total-qty').text('0');
                $('#td-overalltotal').text('0'); 
            }
        });
    });


} 

});