// Interface for highlighted areas
// addHighlightedArea() - Add a single highlighted area to the current page
// saveHighightedArea() - Save a highlighted area
// deleteHighlightedAreas() - Delete all highlighted areas for the current page
// getHighlightedArea() - Get data for a single highlighted area
// getHighlightedAreas() - Get a list of highlighted areas

function addHighlightedArea (img_id, code_id, selection) {
    // Get div containing highlighted area info for the specified image
    var ha_group = $("#ha_group_" + img_id);
    var count = ha_group.children().length;
    var cssid = img_id + '_' + (count+1);
    // Create hidden fields to contain data
    var ha_elt = $('<div>').attr('id', cssid).appendTo(ha_group);
    var tag = '<input type="hidden"/>';
    $(tag).attr('name', 'ha_name[]').val(cssid).appendTo(ha_elt);
    $(tag).attr('name', 'img_id_'+cssid).val(img_id).appendTo(ha_elt);
    $(tag).attr('name', 'id_'+cssid).val(0).appendTo(ha_elt);
    $(tag).attr('name', 'code_id_'+cssid).val(code_id).appendTo(ha_elt);
    $(tag).attr('name', 'x1_'+cssid).val(selection.x1).appendTo(ha_elt);
    $(tag).attr('name', 'y1_'+cssid).val(selection.y1).appendTo(ha_elt);
    $(tag).attr('name', 'x2_'+cssid).val(selection.x2).appendTo(ha_elt);
    $(tag).attr('name', 'y2_'+cssid).val(selection.y2).appendTo(ha_elt);
    $(tag).attr('name', 'width_'+cssid).val(selection.width).appendTo(ha_elt);
    $(tag).attr('name', 'height_'+cssid).val(selection.height).appendTo(ha_elt);
    $(tag).attr('name', 'deleted_'+cssid).appendTo(ha_elt);
    setModified();
    clearNothingToCode(img_id);
    return getHighlightedArea(cssid);
}

function saveHighlightedArea (ha) {
    // Get element containing hidden fields and update their values
    cssid = ha.cssid;
    var ha_elt = $('#' + cssid);
    $("[name='code_id_"+cssid+"']").val(ha.code_id);
    $("[name='x1_"+cssid+"']").val(ha.x1);
    $("[name='x2_"+cssid+"']").val(ha.x2);
    $("[name='y1_"+cssid+"']").val(ha.y1);
    $("[name='y2_"+cssid+"']").val(ha.y2);
    $("[name='width_"+cssid+"']").val(ha.width);
    $("[name='height_"+cssid+"']").val(ha.height);
    $("[name='deleted_"+cssid+"']").val(ha.deleted);
    setModified();
}

function deleteHighlightedAreas (img_id) {
    ha_list = getHighlightedAreas(img_id);
    var i;
    for (i = 0; i < ha_list.length; i++) {
        ha_list[i].deleted = '1';
        saveHighlightedArea(ha_list[i]);
    }
    clearNothingToCode(img_id);
    setModified();
}

function getHighlightedArea (cssid) {
    ha = {}
    ha.cssid = cssid;
    ha.id = $("[name='id_"+cssid+"']").val();
    ha.code_id = $("[name='code_id_"+cssid+"']").val();
    ha.x1 = $("[name='x1_"+cssid+"']").val();
    ha.x2 = $("[name='x2_"+cssid+"']").val();
    ha.y1 = $("[name='y1_"+cssid+"']").val();
    ha.y2 = $("[name='y2_"+cssid+"']").val();
    ha.width = $("[name='width_"+cssid+"']").val();
    ha.height = $("[name='height_"+cssid+"']").val();
    ha.deleted = $("[name='deleted_"+cssid+"']").val();
    return ha;
}

function getHighlightedAreas (img_id) {
    // Get div containing highlighted area info for the specified image.
    // Then load the highlighted area for each child element.
    var ha_list = [];
    $("#ha_group_" + img_id).children().each(function () {
        ha_list.push(getHighlightedArea($(this).attr('id')));
    });
    return ha_list;
}