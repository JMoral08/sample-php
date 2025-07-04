$(document).ready(function(){
let Init = {
    form_expenses                    : $("#form-expenses"),
    text_product_description         : $("#txt-product-description"),
    text_product_amount              : $("#txt-product-amount"),
    text_product_date                : $("#txt-product-date"),
    label_user                       : $("#lbl-user"),
    label_users                      : $("#lbl-users"),
    tbody_product                    : $("#tbody-product"),
    button_product_add               : $("#btn-product-add"),
    button_product_update            : $("#btn-product-update"),
    button_product_cancel            : $("#btn-product-cancel")
};
Init.button_product_add.on('click', ProductAdd);
Init.button_product_cancel.on('click', FormCancel);
Init.tbody_product.on('click', '#btn-edit', EditDetails);
getData();
FormCancel();

function FormCancel() {
    let $self = Init;
        $self.form_expenses[0].reset();
        $self.button_product_update.hide();
        $self.button_product_add.show();

}

function ProductAdd(e) {
    e.preventDefault();
    let $self = Init;
    let data = {
        'action'         : 'add',
        'description'    : $self.text_product_description.val(),
        'product_amount' : $self.text_product_amount.val(),
        'product_date'   : $self.text_product_date.val()
    };
    // console.log(data);
    if($self.text_product_description.val() == '') {
        $self.text_product_description.focus();
    } else if($self.text_product_amount.val() == '') {
        $self.text_product_amount.focus();
    } else {
        $.ajax({
            url: 'model/expenses.php',
            type: 'post',
            data: data,
            success:function(data){
                //console.log(data);
                FormCancel();
                getData();
            }
        });
    }
}

function EditDetails() {
    let $self = Init;
    let id = $(this).attr('data-id');
    let description = $(this).parents('tr').find('td[data-target=description]').text();
    let amount = $(this).parents('tr').find('td[data-target=amount]').text();

    $self.text_product_description.val(description);
    $self.text_product_amount.val(amount);
    $self.button_product_add.hide();
    $self.button_product_update.html('<i class="bi bi-person-check-fill"></i> Update');
    $self.button_product_update.show();

    $('body').on('click', '#btn-product-update', function() {
        let data = {
            'action'            : 'update',
            'id'                : id,
            'description'       : $self.text_product_description.val(),
            'product_amount'    : $self.text_product_amount.val()
        };
        $.ajax({
            url: 'model/expenses.php',
            type: 'post',
            data: data,
            success:function(data){
                // console.log(data);
                Swal.fire(data);
                getData();
                FormCancel();
            }
        });
    })
}

function getData() {
    let $self = Init;
    let output = '';
    $.ajax({
        url: 'model/expenses.php',
        type: 'post',
        data: {'action' : 'view'},
        dataType: 'json',
        success:function(data){
            for(i=0; i<data.length; i++) {
                output +="<tr data-id='"+data[i].id+"'>"+
                        "<td data-target='description'>"+data[i].description+"</td>"+
                        "<td data-target='amount'>"+data[i].product_amount+"</td>"+
                        "<td>"+data[i].datetoday+"</td>"+
                        "<td class='text-center'><a class='btn btn-warning' id='btn-edit' data-id='"+data[i].id+"'><i class='bi bi-pencil-square'></i></a></td>"+
                        "</tr>";
            }
            $self.tbody_product.html(output);
        }
    });
}

});