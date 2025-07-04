$(document).ready(function(){

let Init = {
    text_daily          : $("#txt-daily"),
    text_from_weekly    : $("#txt-from-weekly"),
    text_to_weekly      : $("#txt-to-weekly"),
    text_monthly        : $("#txt-monthly"),
    label_user          : $("#lbl-user"),
    label_users         : $("#lbl-users"),

    tbody_daily         : $("#tbody-daily"),
    tbody_weekly        : $("#tbody-weekly"),
    tbody_monthly       : $("#tbody-monthly"),

    button_daily        : $("#btn-daily"),
    button_weekly       : $("#btn-weekly"),
    button_monthly      : $("#btn-monthly"),

    td_daily_quantity   : $("#td-daily-qty"),
    td_daily_total      : $("#td-daily-total"),
    td_weekly_quantity  : $("#td-weekly-qty"),
    td_weekly_total     : $("#td-weekly-total"),
    td_monthly_quantity : $("#td-monthly-qty"),
    td_monthly_total    : $("#td-monthly-total")

};
Init.button_daily.on('click', dailySearch);
Init.button_weekly.on('click', weeklySearch);
Init.button_monthly.on('click', monthlySearch);
getTotal();

function getTotal() {
    let $self = Init;
    let subtotal = 0;
    let totalqty = 0;

    $("td:nth-child(3)").each(function(){
        totalqty += parseFloat($(this).text());
    });
    $self.td_weekly_quantity.html(+totalqty.toFixed(2));

    $("td:nth-child(4)").each(function(){
        subtotal += parseFloat($(this).text());
    });
    $self.td_weekly_total.html(+subtotal.toFixed(2));
}

function dailySearch() {
    let $self = Init;
    let dailysubtotal = 0;
    let dailytotalqty = 0;
    let output = '';
    let data = {
        'action'    : 'daily',
        daily       :$self.text_daily.val() 
    };
    if ($self.text_daily.val() == '') {
        alert('Please fill the blank!');
    } else {
        $.ajax({
        url: 'model/inventory.php',
        type: 'post',
        data: data,
        dataType: 'json',
        success:function(data) {
            for(i=0; i<data.length; i++) {
                output += "<tr id='"+data[i].id+"'>"+
                        "<td class='text-uppercase'>"+data[i].productname+"</td>"+
                        "<td>"+data[i].amount+"</td>"+
                        "<td data-target='daily-qty'>"+data[i].quantity+"</td>"+
                        "<td data-target='daily-amount'>"+data[i].total_amount+"</td>"+
                        "<td class='table-active'>"+data[i].date_today+"</td>"+
                        "</tr>";
                    }
                $self.tbody_daily.html(output);
                $("td[data-target=daily-qty]").each(function(){
                    dailytotalqty += parseFloat($(this).text());
                });
                $self.td_daily_quantity.text(+dailytotalqty.toFixed(2));

                $("td[data-target=daily-amount]").each(function(){
                    dailysubtotal += parseFloat($(this).text());
                });
                $self.td_daily_total.text(+dailysubtotal.toFixed(2));   
            }
        });
    }
    
}

function weeklySearch() {
    let $self = Init;
    let weeklysubtotal = 0;
    let weeklytotalqty = 0;
    let output = '';
    let data = {
        'action': 'weekly',
        from    :$self.text_from_weekly.val(),
        to      :$self.text_to_weekly.val()
    };
    if ($self.text_from_weekly.val() == '' ) {
        alert(1);
    } else if ($self.text_to_weekly.val() == '' ) {
        alert(2);
    } else {
        $.ajax({
            url: 'model/inventory.php',
            type: 'post',
            data: data,
            dataType: 'json',
            success:function(data) {
                for(i=0; i<data.length; i++) {
                    output += "<tr id='"+data[i].id+"'>"+
                        "<td class='text-uppercase'>"+data[i].productname+"</td>"+
                        "<td>"+data[i].amount+"</td>"+
                        "<td data-target='weekly-qty'>"+data[i].quantity+"</td>"+
                        "<td data-target='weekly-amount'>"+data[i].total_amount+"</td>"+
                        "<td class='table-active'>"+data[i].date_today+"</td>"+
                        "</tr>";
                }
                $self.tbody_weekly.html(output);
                $("td[data-target=weekly-qty]").each(function(){
                    weeklytotalqty += parseFloat($(this).text());
                });
                $self.td_weekly_quantity.text(+weeklytotalqty.toFixed(2));

                $("td[data-target=weekly-amount]").each(function(){
                    weeklysubtotal += parseFloat($(this).text());
                });
                $self.td_weekly_total.text(+weeklysubtotal.toFixed(2));
            }
        });
    }
}

function monthlySearch() {
    let $self = Init;
    let subtotal = 0;
    let totalqty = 0;
    let output = '';
    let data = {
        'action'    : 'monthly',
        monthly     : $self.text_monthly.val() 
    };
    if ($self.text_monthly.val() == '') {
        alert('Please fill the blank!');
    } else {
        $.ajax({
        url: 'model/inventory.php',
        type: 'post',
        data: data,
        dataType: 'json',
        success:function(data) {
            // console.log(data);
            for(i=0; i<data.length; i++) {
                output += "<tr id='"+data[i].id+"'>"+
                        "<td class='text-uppercase'>"+data[i].productname+"</td>"+
                        "<td>"+data[i].amount+"</td>"+
                        "<td>"+data[i].quantity+"</td>"+
                        "<td>"+data[i].total_amount+"</td>"+
                        "<td class='table-active'>"+data[i].date_today+"</td>"+
                        "</tr>";
                    }
                $self.tbody_monthly.html(output);
                $("td:nth-child(3)").each(function(){
                    totalqty += parseFloat($(this).text());
                });
                $self.td_monthly_quantity.html(+totalqty.toFixed(2));

                $("td:nth-child(4)").each(function(){
                    subtotal += parseFloat($(this).text());
                });
                $self.td_monthly_total.html(+subtotal.toFixed(2));   
            }
        });
    }
    
}

});