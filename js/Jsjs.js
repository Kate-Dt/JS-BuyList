
$(function(){

    $(".item:first").hide();

    var $addButton = $('.addButton');
    var titleInput = $('.rowTitle span');

    $addButton.on("click", addItemNew);

    $(".inputItem").keyup(function(event){
        if (event.which == 13) {
            addItemNew();
        }
    });

    $(titleInput).mousedown(function () {editTitle(this)});

    $(".bought").click(function(){isBought(this)});
    $(".makeNotBought").click(function () {notBought(this)});
    $(".delete").click(function(){isDeleted(this)});
    $(".plusButton").click(function(){plusItem(this)});
    $(".minusButton").click(function(){minusItem(this)});
    // $(".minusButton").on("click", minusItem(this));

        
    });




function plusItem(button) {
    var num = $(button).siblings().last().text();
    if (num < 2) {
        $(button).siblings().first().css("background-color", "rgb(219, 40, 40)")
            .css("border-color", "rgba(219, 40, 40, 0.6");
        $(button).siblings().first().attr("disabled", false);
    }
    num++;
    $(button).siblings().last().text(num);

    $(".boughtItem:contains(" + $(button).closest('.item').find(".rowTitle span").text() + ")")
        .find(".roundLabel").text(num);

}

function minusItem(button) {
    var num = $(button).next(".itemsCounter").text();
    num--;
    if (num < 2){
        $(button).attr("disabled", true).css("background-color", "rgba(219, 40, 40, 0.55)")
            .css("border-color", "rgba(219, 40, 40, 0.5");
    }
    console.log(num);

    $(button).next().text(num);
    $(".boughtItem:contains(" + $(button).closest('.item').find(".rowTitle span").text() + ")")
        .find(".roundLabel").text(num);


}


function editTitle(titleClass) {
    var oldText = $(titleClass).closest(".rowTitle span").text();
    $(titleClass).closest(".rowTitle").find(".inputTitle")
        .val($(titleClass).closest(".rowTitle span").text()).show()
        .mouseout(function () {editedInput(this, oldText)});
    $(titleClass).closest(".rowTitle span").text("");
}

function editedInput(className, oldText) {
    if ($(className).val() != "") {
        var newText = $(className).val();}
        else {var newText = oldText}
        $(className).parent().find(".span").text(newText);
        $(".boughtItem:contains(" + oldText + ")").find(".title").text(newText);
        $(className).hide();
}

function notBought(buttonNB) {

    var plusButton = $("<button/>")
        .addClass("plusButton").attr("type", "button").attr("data-tooltip", "збільшити на 1").text("+");
    var minusButton = $("<button/>")
        .addClass("minusButton").attr("type", "button").attr("data-tooltip", "зменшити на 1").text("-");

    if ($(buttonNB).closest(".item").find(".itemsCounter").text() == 1){

    }

    var text = $(buttonNB).closest(".item").find(".rowTitle span").text();
    $(".boughtItem:contains("+text+")").detach().prependTo(".boughtSegment")
        .find(".title").css("text-decoration", "none");

    $(buttonNB).closest(".item").css("text-decoration","none");
    $(buttonNB).next().show();
    $(buttonNB).closest('.item').find('.buttonsAndNumber').append(plusButton).prepend(minusButton);

    $(buttonNB).text("Куплено").attr("class", "bought")
        .click(function(){isBought(this)}).attr("data-tooltip", "зробити купленим");

}


function isDeleted(buttonClass) {
    var text = $(buttonClass).closest(".item").find(".rowTitle span").text();

    $(buttonClass).closest(".item").remove();
    $(".boughtItem:contains("+text+")").remove();
}



function isBought(buttonClass){
    $(buttonClass).closest(".item").css("text-decoration","line-through");
    $(buttonClass).next().hide();
    $(buttonClass).text("Зробити не купленим").attr("class", "makeNotBought")
        .click(function () {notBought(this)}).attr("data-tooltip", "зробити не купленим");
    $(buttonClass).parent().siblings().find(".minusButton, .plusButton").remove();
    var itemName = $(buttonClass).closest(".item").find(".rowTitle span").text();
    $(".boughtItem:contains("+itemName+")").detach().appendTo(".boughtItemsList")
        .find(".title").css("text-decoration", "line-through");

}


function addItemNew(){

    var newItemName = $("input").val();
    var newBoxx = $("<div/>").addClass("boughtItem").append("<span class='title'>"+newItemName+"</span>")
        .append("<span class='roundLabel'>1</span>");

    if (newItemName.trim().length !== 0){

        var template = $(".item:first").clone();
        template.find(".rowTitle span").text(newItemName).mousedown(function () {editTitle(this)});
        template.find(".bought").click(function(){isBought(this)});
        template.find(".delete").click(function(){isDeleted(this)});
        template.find(".plusButton").click(function(){plusItem(this)});
        template.find(".minusButton").click(function(){minusItem(this)});
        template.show();
        $('.columnLeft').append(template);
        $("input").val("").focus();
        $(newBoxx).appendTo(".boughtSegment");

    }}



