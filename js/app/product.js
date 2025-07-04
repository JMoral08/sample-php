$(document).ready(function(){

let Init = {

    text_product            : $("#txt-product"),
    text_amount             : $("#txt-amount"),
    text_categories         : $("#txt-categories"),
    text_status             : $("#txt-status"),
    form_product            : $("#form-product"),
    tbody_product           : $("#tbody-product"),

    lbl_update_product      : $("#lbl-update-product"),
    label_user              : $("#lbl-user"),
    label_users             : $("#lbl-users"),
    button_add_product      : $("#btn-add-product"),
    button_cancel_product   : $("#btn-cancel-product"),
    button_edit_product     : $("#btn-edit-product"),
    button_delete_product   : $("#btn-delete-product"),
    button_update_product   : $("#btn-update-product")

};
Init.button_cancel_product.on('click', FormCancel);
Init.button_add_product.on('click', AddProduct);
Init.tbody_product.on('click', '#btn-delete-product', DeleteProduct);
Init.tbody_product.on('click', '#btn-edit-product', EditProduct);
FormCancel();
GetData();

function FormCancel() {
    let $self = Init;
        $self.form_product[0].reset();
        $self.lbl_update_product.text('Add New');
        $self.button_add_product.show();
        $self.button_update_product.hide();
        $self.text_status.attr('disabled', true);
}

function AddProduct(e) {
    e.preventDefault();
    let $self = Init;
    let data = {
        'action'          : 'insert',
        'product'         : $self.text_product.val(),
        'amount'          : $self.text_amount.val(),
        'categories'      : $self.text_categories.val(),
        'status'          : $self.text_status.val()
    };
    if($self.text_product.val() == "") {
        $self.text_product.focus();
    } else if($self.text_amount.val() == "") {
       $self.text_amount.focus();
    }else if($self.text_categories.val() == "") {
        $self.text_categories.focus();
    } else {
        $.ajax({
            url: 'model/product.php',
            type: 'post',
            data: data,
            success:function(data) {
                let Toast = Swal.mixin({
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                      }
                    });
                    Toast.fire({
                      icon: "success",
                      title: data
                    });
                    GetData();
                    FormCancel();
                }

            })
    }
}

function EditProduct() {
    let $self = Init;
    let aData = [];

    let id = $(this).attr('data-id');
    let product = $(this).parents('tr').find('td[data-target=txt-product]').html();
    let amount = $(this).parents('tr').find('td[data-target=txt-amount]').html();
    let categories = $(this).parents('tr').find('td[data-target=txt-categories]').html();
    let status = $(this).parents('tr').find('td[data-target=txt-status]').html();

    $self.text_product.val(product);
    $self.text_amount.val(amount);
    $self.text_categories.val(categories);
    $self.text_status.val(status);
    $self.text_status.removeAttr('disabled');
    $self.lbl_update_product.text('Update');
    $self.button_add_product.hide();
    $self.button_update_product.show();

    let obj = {};
        obj.id = id;
        obj.product = product;
        obj.amount = amount;
        obj.categories = categories;
        obj.status = status;

        aData.push(obj);
        // console.log(aData);
    $('body').on('click', '#btn-update-product', function() {
        let data = {
            'action'    : 'update',
            'id'        : id,
            'product'   : $self.text_product.val(),
            'amount'    : $self.text_amount.val(),
            'categories': $self.text_categories.val(),
            'status'    : $self.text_status.val()
        };
        Swal.fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, change it!"
            }).then((result) => {
              if (result.isConfirmed) {
                $.ajax({
                    url: 'model/product.php',
                    type: 'post',
                    data: data,
                    success:function(data) {
                        console.log(data);
                        Swal.fire({
                          title: data,
                          text: "Your file has been updated.",
                          icon: "success"
                        }).then([
                            GetData()
                        ]);
                        FormCancel();
                    }
                });
              }
            });
    });
}

function DeleteProduct() {
    let $self = Init;
        id = $(this).attr('data-id');
        mythis = this;
        Swal.fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                $.ajax({
                    url: 'model/product.php',
                    type: 'post',
                    data: {
                        'action' : 'delete',
                        id : id
                    },
                    success:function(data) {
                        //console.log(data);
                        Swal.fire({
                          title: data,
                          text: "Your file has been deleted.",
                          icon: "success"
                        }).then([
                            $(mythis).closest('tr').remove()
                        ]);
                    }
                });
              }
            });

}

function GetData() {
    let $self = Init;
    let output = '';
    $.ajax({
        url: 'model/product.php',
        type: 'post',
        data: {'action' : 'view'},
        dataType: 'json',
        success:function(data) {
            for (i=0; i<data.length; i++) {
                output += "<tr id='id'> "+
                        "<td data-target='txt-product' class='text-uppercase'>"+data[i].productname+"</td>"+
                        "<td data-target='txt-amount'>"+data[i].amount+"</td>"+
                        "<td data-target='txt-categories'>"+data[i].categories+"</td>"+
                        "<td data-target='txt-status'>"+data[i].status+"</td>"+
                        "<td class='text-center'>"+
                            "<div class='btn-group' role='group'>"+
                                "<button class='btn btn-warning btn-sm' id='btn-edit-product' data-id="+data[i].id+"><i class='bi bi-pencil-square'></i></button> "+
                                "<button class='btn btn-danger btn-sm' id='btn-delete-product' data-id="+data[i].id+"><i class='bi bi-trash3'></i></button>"+
                            "</div>"+
                        "</td>"+
                        "</tr>";
            }
            $self.tbody_product.html(output);
        }
    })
}

});
