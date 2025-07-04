$(document).ready(function() {
	let Init = {
		tbody_people_list 		: $("#tbody-people-list"),
		tbody_view_liability 	: $("#tbody-view-liability"),
		tbody_show_liability 	: $("#tbody-show-liability"),
		tbody_product_list 		: $("#tbody-product-list"),
		tbody_expenses_list 	: $("#tbody-expenses-list")
	};
	Init.tbody_view_liability.on('click','#btn-show', showLiability);

	//People List View//
	PeopleListView();
	function PeopleListView() {
		let $self = Init;
		let output = '';
		let data = {'action' : 'peopleview'};
		$.ajax({
			url: 'model/settings.php',
			type: 'post',
			data: data,
			dataType: 'json',
			success:function(data) {
				for(i=0; i<data.length; i++) {
					output +="<tr>"+
							"<td class='text-capitalize'>"+data[i].firstname+"</td>"+
							"<td class='text-capitalize'>"+data[i].middlename+"</td>"+
							"<td class='text-capitalize'>"+data[i].lastname+"</td>"+
							"<td>"+data[i].contactno+"</td>"+
							"<td>"+data[i].email+"</td>"+
							"<td>"+data[i].address+"</td>"+
							"<td class='bg-warning text-white'>"+data[i].role+"</td>"+
							"</tr>";
				}
				$self.tbody_people_list.html(output);
			}
		});
	}

	//Liability List//
	LiabilityView();
	function LiabilityView() {
		let $self = Init;
		let output = '';
		let data = {'action' : 'liabilityview'};
		$.ajax({
			url: 'model/settings.php',
			type: 'post',
			data: data,
			dataType: 'json',
			success:function(data) {
				for(i=0; i<data.length; i++) {
					output +="<tr id='"+data[i].id+"'>"+
							"<td class='text-uppercase' data-target='customer'>"+data[i].customer+"</td>"+
							"<td class='text-end'>"+data[i].totalqty+"</td>"+
							"<td data-target='overalltotal'>"+data[i].subtotal+"</td>"+
							"<td class='text-center'><button type='button' class='btn btn-secondary btn-sm' id='btn-show'><i class='bi bi-clipboard-check'></i></button></td>"+
							"</tr>";
				}
				$self.tbody_view_liability.html(output);
			}
		});
	}

	//ShowLiability//
	function showLiability() {
		let $self = Init;
		let output = '';
		let overalltotal = $(this).parents('tr').find('td[data-target=overalltotal]').html();
		let data = {
			'action' 	 : 'showLiability',
			'customer' 	 : $(this).parents('tr').find('td[data-target=customer]').html()
		}
		// alert($(this).attr('data-id'));
		$.ajax({
			url: 'model/settings.php',
			type: 'post',
			data: data,
			dataType: 'json',
			success:function(data) {
				for(i=0; i<data.length; i++) {
					output +="<tr>"+
						"<td>"+data[i].productname+"</td>"+
						"<td>"+data[i].quantity+"</td>"+
						"<td>"+data[i].amount+"</td>"+
						"</tr>";
					$('#lbl-customer').html(data[i].customer)
					$('#td-subtotal').html(overalltotal)
				}
				// console.log(data);
				$self.tbody_show_liability.html(output);
			}
		});

	}


	//Product List
	ProductListView();
	function ProductListView() {
		let $self = Init;
		let output = '';

		$.ajax({
			url: 'model/settings.php',
			type: 'post',
			data: {'action'  : 'productview'},
			dataType: 'json',
			success:function(data) {
				for(i=0; i<data.length; i++) {
					output +="<tr>"+
							"<td class='text-uppercase fw-bold'>"+data[i].productname+"</td>"+
							"<td>"+data[i].amount+".00</td>"+
							"<td>"+data[i].categories+"</td>"+
							"<td class='bg-success text-white text-center'>"+data[i].status+"</td>"+
							"</tr>";
				}
				$self.tbody_product_list.html(output);
			}
		});
	}

	//Expenses List
	ExpensesListView();
	function ExpensesListView() {
		let $self = Init;
		let output = '';
		$.ajax({
			url: 'model/settings.php',
			type: 'post',
			data: {'action' : 'expensesview'},
			dataType: 'json',
			success:function(data) {
				for(i=0; i<data.length; i++) {
					output +="<tr id='"+data[i].id+"'>"+
						"<td>"+data[i].description+"</td>"+
						"<td>"+data[i].product_amount+".00</td>"+
						"<td class='bg-warning text-white'>"+data[i].datetoday+"</td>"+
						"</tr>";
				}
				$self.tbody_expenses_list.html(output);
			}
		});
	}

});