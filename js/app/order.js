$(document).ready(function(){

let Init = {
    select_product              : $("#select-product"),
    text_quantity               : $("#txt-qty"),
    text_customer               : $("#txt-customer"),
    text_amount                 : $("#txt-amount"),
    text_status                 : $("#txt-status"),

    form_order                  : $("#form-order"),
    form_customer_details       : $("#form-customer-details"),
    tbody_order                 : $("#tbody-order"),
    button_add_order            : $("#btn-add-order"),
    button_update_order         : $("#btn-update-order"),
    button_cancel_order         : $("#btn-cancel-order"),
    button_add_payment          : $("#btn-add-payment"),
    button_add_amount           : $("#btn-add-amount"),

    td_product_id               : $("#td-product-id"),
    td_amount                   : $("#td-amount"),
    td_change                   : $("#td-change"),
    td_quantity                 : $("#td-qty"),
    td_total                    : $("#td-total"),
    td_overall_total            : $("#td-overall-total"),
    td_total_quantity           : $("#td-total-qty"),
    label_customername          : $("#lbl-customername"),
    label_user                  : $("#lbl-user"),
    label_users                 : $("#lbl-users"),
    label_date                  : $("#lbl-date"),
    edit_order                  : $("#edit-order")

};
Init.button_add_order.on('click', AddOrder);
Init.button_cancel_order.on('click', FormCancel);
Init.button_add_payment.on('click', Payment);
Init.button_add_amount.on('click', AddAmount);
Init.tbody_order.on('click', '#btn-delete', DeleteProduct);
// Init.tbody_order.on('click', '#btn-edit', EditOrder);
getData();
getTotal();
getDate();
FormCancel();

function getDate() {
    let $self = Init;
    let datetoday = new Date().toLocaleDateString();

    $self.label_date.text(datetoday);
}

function FormCancel() {
    let $self = Init;
        $self.form_order[0].reset();
        $self.form_customer_details[0].reset();
        $self.button_add_order.show();
        $self.button_update_order.hide();
        $self.td_overall_total.text(0);
        $self.td_total_quantity.text(0);
        $('#td-customer').text('');
        $('#td-subtotal').text(0);
        $('#td-amount').text(0);
        $('#td-change').text(0);
}
function getTotal() {
    let $self = Init;
    let subtotal = 0;
    let totalqty = 0; 

    $("td[data-target=td-total]").each(function(){
        subtotal += parseFloat($(this).text());
    });
    $('#td-overall-total').html(+subtotal);
    $('#td-subtotal').html(+subtotal);

    $("td[data-target=td-qty]").each(function(){
        totalqty += parseFloat($(this).text());
    });
    $('#td-total-qty').html(+totalqty);
}

function Payment(e) {
    e.preventDefault();
    let $self = Init;
    $("#tbody-order tr").each(function(){
        let data = {
            'action'          : 'payment',
            // 'id'              : $(this).find("tr").attr('id'),
            'order_id'        : $(this).find("td").attr('data-id'),
            'quantity'        : $(this).find("td").eq(2).text(),
            'total_amount'    : $(this).find("td").eq(3).text(),
            'total_qty'       : $self.td_total_quantity.text(),
            'overall_total'   : $self.td_overall_total.text(),
            'customer'        : $('#td-customer').text(),
            'user'            : $('#td-user').text(),
            'status'          : $self.text_status.val()
        };
        $.ajax({
            url: 'model/order.php',
            type: 'post',
            data: data,
            success:function(data) {
                Swal.fire({
                    title: data,
                    text: "Your file has been added.",
                    icon: "success"
                }).then([
                    $('#tbody-order').empty()
                ]);              
                $self.text_customer.attr('disabled', true);
                $self.text_amount.attr('disabled', true);
                $self.text_status.attr('disabled', true);
                $self.button_add_amount.attr('disabled', true);
                FormCancel();
            }
        });
    });
 }


function AddOrder(e) {
    e.preventDefault();
    let $self = Init;
    let product = $self.select_product.val();
    let quantity = $self.text_quantity.val();

    let data = {
        'action' : 'showorder',
        'id' : $self.select_product.val()
    };
    // console.log(data);
    if (quantity == false ) {
        alert('Please fill out quantity!');
    } else {
        $self.text_customer.removeAttr('disabled', true);
        $self.text_amount.removeAttr('disabled', true);
        $self.text_status.removeAttr('disabled', true);
        $self.button_add_amount.removeAttr('disabled', true);
        
        $.ajax({
            url: 'model/order.php',
            type: 'post',
            data:data,
            dataType: 'json',
            success:function(data) {
                // console.log(data);
                for(i=0; i<data.length; i++) {
                    $('#tbody-order').append("<tr id='"+data[i].id+"'>"+
                    "<td class='text-uppercase fw-bold' data-id='"+data[i].id+"'>"+data[i].productname+"</td>"+
                    "<td class='text-start'>"+data[i].amount+"</td>"+
                    "<td class='text-end' data-target='td-qty'>"+quantity+"</td>"+
                    "<td class='text-start' data-target='td-total'>"+data[i].amount * quantity+"</td>"+
                    "<td class='text-center'>"+
                    "<a class='text-danger' id='btn-delete'><i class='fa-solid fa-trash'></i> </a>"+
                    "</td>"+
                    "</tr>");
                    getTotal();
                }
            }
        })
        FormCancel();
    }
}

function AddAmount() {
    let $self = Init;
    let change = 0;
    let customer = $self.text_customer.val();
    let amount = $self.text_amount.val();
    let subtotal = $('#td-overall-total').html();
    let changeamount = amount - subtotal;

    $('#td-amount').text(amount);
    $('#td-change').text(changeamount);
    $('#td-customer').text(customer);
    // $self.form_customer_details[0].reset();

}

function DeleteProduct() {
    let $self = Init;
    let mythis = this;
    let subtotal = 0;
    let totalqty = 0;

    $(mythis).closest('tr').remove();

    $("td:nth-child(4)").each(function(){
        subtotal -= parseFloat($(this).text());
    });
    $('#td-overall-total').html(-subtotal);
    $('#td-subtotal').html(-subtotal);

    $("td:nth-child(3)").each(function(){
        totalqty -= parseFloat($(this).text());
    });
    $('#td-total-qty').html(-totalqty);
}

// function EditOrder() {
//     let $self = Init;
//     let id = $(this).attr('data-id');
//     let quantity = $(this).parents('tr').find("td[data-target=td-qty]").html();

//     $self.select_product.val(id);
//     $self.text_quantity.val(quantity);
//     $self.button_add_order.hide();
//     $self.button_update_order.show();

//     $('body').on('click', '#btn-update-order', function() {
//         let quantity = $self.text_quantity.val();
//         let amount1 = $("#td-amount1").html();
//         let totalamount = amount1 * quantity;

//         $("#td-qty").html(quantity);
//         $("#td-total").html(totalamount);

//         getTotal();
//         FormCancel();
//     });
    
// }

function getData() {
    let $self = Init;
    let output = '';
    $.ajax({
        url: 'model/order.php',
        type: 'post',
        data: {'action' : 'view'},
        dataType: 'json',
        success:function(data) {
            // console.log(data);
            for (i=0; i<data.length; i++) {
                output += "<option class='text-uppercase' data-id='"+data[i].id+"' value='"+data[i].id+"'>"+data[i].productname+"</option>";
             }
            $self.select_product.append(output);
        }
    })

}



});
