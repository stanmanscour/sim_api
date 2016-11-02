var debug = false;
function log(msg) { if (debug) console.log(msg); }
var root = "https://demo.simplicite.cloud/api/";
var opts = { crossDomain: true, xhrFields: { withCredentials: true } };
$(document).ready(function() {
    $.ajaxSetup(opts);
        // Call to login endpoint to get a auth token
        $.ajax({ url: root + "login?_output=json", data: { username: "website", password: "simplicite" } }).done(function(user) {
            log(user);
                // Add the auth token to the global Ajax options
                opts.headers = { "X-Simplicite-Authorization": "Bearer " + user.authtoken }
                $.ajaxSetup(opts);
                // Call search REST service on the DemoProduct object with filter on the demoPrdAvailable field
                showOrder();
                // ici
                function showOrder(){

                    var $c = $(".sim-orders-container");
                    $c.html('Chargement...');

                    $.ajax({ url: root + "rest/DemoOrder", data: { demoPrdAvailable: true } }).done(function(products) {
                        $("#nbproducts").text(products.length);
                        $c.empty();
                        for (var k in products) {
                            var p = products[k],
                                v = '.sim-order-' + k;
                            log(p);

                            $c.append($('<div/>', {class: 'sim-order-' + k}));
                            $(v).addClass('sim-order').append($('<div/>', {class: 'sim-order-upperInfo'}))
                            .append($('<div/>', {class: 'sim-order-cmdInfo'}))
                            .append($('<div/>', {class: 'sim-order-cmdDetail'}));

                            $(v + ' .sim-order-upperInfo').append($('<div/>', {class: 'sim-order-clientInfo'}))
                            .append($('<div/>', {class: 'sim-order-cmdStatus'}));

                            $(v + ' .sim-order-clientInfo').append('<p class="sim-order-clientInfo-date sim-order-textTitle">'+p.demoOrdDate+'</p>')
                            .append('<p class="sim-order-clientInfo-name sim-order-textTitle">'+p.demoOrdCliId__demoCliFirstname +' '+ p.demoOrdCliId__demoCliLastname +'</p>')
                            .append('<p class="sim-order-clientInfo-street sim-order-text">'+p.demoOrdCliId__demoCliAddress1 +' '+ p.demoOrdCliId__demoCliZipCode + ' ' + p.demoOrdCliId__demoCliCity +'</p>');
                            $(v + ' .sim-order-cmdStatus').append($('<div/>', {class: 'sim-order-cmdStatus-divId'}))
                            .append($('<div/>', {class: 'sim-order-cmdStatus-divStatus'}));

                            $(v + ' .sim-order-cmdStatus-divId').append('<p class="sim-order-cmdStatus-divStatus-status">'+ p.demoOrdNumber +'</p>');
                            $(v + ' .sim-order-cmdStatus-divStatus').append('<p class="sim-order-cmdStatus-divStatus-status">'+ p.demoOrdStatus +'</p>');
                            $(v + ' .sim-order-cmdInfo').append('<ul><li></li></ul>');

                            $(v + ' .sim-order-cmdInfo ul li')
                            .append($('<div/>', {class: 'sim-order-cmdInfo-text info-ref'}))
                            .append($('<div/>', {class: 'sim-order-cmdInfo-text info-price'}))
                            .append($('<div/>', {class: 'sim-order-cmdInfo-text info-qty'}));

                            $(v + ' li .sim-order-cmdInfo-text.info-ref').append('<p class="sim-order-cmdInfo-name sim-order-textTitle">'+ p.demoOrdPrdId__demoPrdSupId__demoSupName +'</p>');
                            $(v + ' li .sim-order-cmdInfo-text.info-price').append('<p class="sim-order-cmdInfo-price sim-order-textTitle">'+ p.demoOrdPrdId__demoPrdUnitPrice +' € </p>');
                            $(v + ' li .sim-order-cmdInfo-text.info-qty').append('<p class="sim-order-cmdInfo-qty sim-order-textTitle"> x '+ p.demoOrdQuantity +'</p>');

                            $(v + ' .sim-order-cmdDetail').append($('<div/>', {class: 'sim-order-cmdDetail-block sim-order-cmdDetail-qty'}))
                            .append($('<div/>', {class: 'sim-order-cmdDetail-block sim-order-cmdDetail-totalPrice'}));

                            $(v + ' .sim-order-cmdDetail-qty').append('<p class="sim-order-cmdDetail-qty sim-order-textTitle">Quantité : '+ p.demoOrdQuantity +'</p>');
                            $(v + ' .sim-order-cmdDetail-totalPrice').append('<p class="sim-order-cmdDetail-qty sim-order-textTitle">Total : ' + p.demoOrdTotal + ' €</p>');
                        }
                    }).fail(function(h=xhr, status, err) { alert("Error: " + err + " (" + status + ")"); 
                });
            }

            function showClient(){

                var $c = $(".sim-clients-container");
                    $c.html('Chargement...');

                $.ajax({ url: root + "rest/DemoClient", data: { demoPrdAvailable: true } }).done(function(products) {
                        $c.empty();
                        for (var k in products) {
                            var p = products[k],
                                v = '.sim-client-block-' + k;
                            log(p);

                            $c.append($('<div/>', {class: 'sim-client-block sim-client-block-' + k}));
                            $('.sim-client-block-' + k).append($('<div/>', {class: 'sim-client-upperInfo'}))
                                .append($('<div/>', {class: 'sim-client-otherInfos'}));

                            $('.sim-client-block-' + k + ' .sim-client-upperInfo').append($('<div/>', {class: 'sim-client-id'}))
                                .append($('<div/>', {class: 'sim-client-info'}))
                                .append($('<div/>', {class: 'sim-client-mobileBtn-open'}));

                            $(v + ' .sim-client-id').append($('<div/>', {class: 'sim-client-divId'}));
                            $(v + ' .sim-client-divId').append('<p class="sim-client-divId-Id">'+ p.row_id +'</p>');


                            $(v + ' .sim-client-info').append('<p class="sim-client-info-name sim-order-textTitle">'+ p.demoCliFirstname +' '+ p.demoCliLastname +'</p>')
                                .append('<p class="sim-client-info-street sim-order-text">'+ p.demoCliAddress1+' '+ p.demoCliZipCode+' '+ p.demoCliCity +'</p>');

                            $(v + ' .sim-client-mobileBtn-open').append('<img src="src/img/arrow-down-icon.png">');

                            $(v + ' .sim-client-otherInfos').append($('<div/>', {class: 'sim-client-otherInfos-text'}))
                                .append($('<div/>', {class: 'sim-client-otherInfos-coord'}));

                            $(v + ' .sim-client-otherInfos-text').append('<p class="sim-client-otherInfos-mobile sim-order-text">'+ p.demoCliWorkPhone +'</p>')
                            .append('<p class="sim-client-otherInfos-email sim-order-text">'+ p.demoCliEmail +'</p>');

                            $(v + ' .sim-client-otherInfos-coord').append('<img src="src/img/map.jpg">');

                        }

                        
                        $('.sim-client-mobileBtn-open').on('click', function(){
                            var $this = (this);
                            $(this).parents().siblings('.sim-client-otherInfos').toggle();
                        })

                    }).fail(function(h=xhr, status, err) { alert("Error: " + err + " (" + status + ")"); 
                });
            }

            function showProduct(){

                var $c = $(".sim-products-container");
                    $c.html('Chargement...');

                 $.ajax({ url: root + "rest/DemoProduct", data: { demoPrdAvailable: true } }).done(function(products) {
                        $c.empty();
                        for (var k in products) {
                            var p = products[k],
                                v = '.sim-product-' + k + ' ';
                            log(p);

                            $c.append($('<div/>', {class: 'sim-product sim-product-' + k}));
                            $(v).append($('<div/>', {class: 'sim-product-img'}))
                                .append($('<div/>', {class: 'sim-product-info'}));

                            $(v + '.sim-product-img').append('<img src="src/img/img-product/'+ k +'.jpg">');

                            $(v + '.sim-product-info').append($('<div/>', {class: 'sim-product-info-text'}))
                                .append($('<div/>', {class: 'sim-product-order'}));

                            $(v + '.sim-product-info-text').append('<p class="sim-order-textTitle">'+ p.demoPrdSupId__demoSupName +'</p>')
                                .append('<p class="sim-order-text">'+ p.demoPrdReference + ' ' + p.demoPrdName +'</p>')
                                .append('<p class="sim-order-text">'+ p.demoPrdDescription +'</p>');

                            $(v + '.sim-product-order').append($('<div/>', {class: 'sim-product-orderPrice'}))
                                .append($('<div/>', {class: 'sim-product-orderBtnCont'}));

                            $(v + '.sim-product-orderPrice').append('<p class="sim-order-text">' + p.demoPrdUnitPrice + ' €</p>');
                            $(v + '.sim-product-orderBtnCont').append('<button class="sim-product-orderBtn sim-order-text"> order </button>')

                        }

                        
                        $('.sim-client-mobileBtn-open').on('click', function(){
                            var $this = (this);
                            $(this).parents().siblings('.sim-client-otherInfos').toggle();
                        })

                    }).fail(function(h=xhr, status, err) { alert("Error: " + err + " (" + status + ")"); 
                });

            }

            $('#menuLinkOrder').click(function(){
                $('.sim-header-menuItem').removeClass('active');
                $(this).addClass('active');
                showOrder();
            })

            $('#menuLinkClient').click(function(){
                $('.sim-header-menuItem').removeClass('active');
                $(this).addClass('active');
                showClient();
            })

            $('#menuLinkProduct').click(function(){
                $('.sim-header-menuItem').removeClass('active');
                $(this).addClass('active');
                showProduct();
            })

        }).fail(function(h=xhr, status, err) { alert("Error: " + err + " (" + status + ")"); 
    });

    
});


