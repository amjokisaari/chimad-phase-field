// Generated by CoffeeScript 1.9.3
(function() {
  var add_date, add_description, add_download_attr, add_examples, add_header, add_icon_links, add_logo, build_function, data_file;

  data_file = "../data/workshops.yaml";

  add_logo = function(selection) {
    var i;
    i = selection.append("i").attr("class", "circle light-green lighen-1");
    i.attr("style", "font-style: normal; font-weight: bold; margin-top: 5px;");
    return i.text(function(d) {
      return d.number;
    });
  };

  add_header = function(selection) {
    var a, span;
    span = selection.append("span").attr("class", "title");
    a = span.append("a").attr("href", function(d) {
      return d.href;
    });
    a.attr("target", "_blank");
    return a.append("h5").text(function(d) {
      return d.name;
    });
  };

  add_date = function(selection) {
    var p;
    p = selection.append("p").attr("style", "font-size: 20px");
    return p.text(function(d) {
      return d.date;
    });
  };

  add_description = function(selection) {
    var p;
    p = selection.append("p").html(function(d) {
      return d.description;
    });
    return p.attr("style", "font-size: 20px; padding-top: 10px");
  };

  add_download_attr = function(data) {
    if (data.type === "file_download") {
      return "";
    } else {
      return null;
    }
  };

  add_icon_links = function(selection) {
    var a, p, subselection;
    subselection = selection.filter(function(d) {
      return "icon_links" in d;
    });
    p = subselection.append("p").attr("style", "padding-top: 10px");
    a = p.selectAll().data(function(d) {
      return d.icon_links;
    }).enter().append("a");
    a.attr("href", function(d) {
      return d.href;
    });
    a.attr("target", "_blank").attr("style", "padding-right: 10px");
    a.attr("title", function(d) {
      return d.name;
    });
    a.append("i").attr("class", "material-icons").text(function(d) {
      return d.type;
    });
    return a.attr("download", add_download_attr);
  };

  add_examples = function(selection, key) {
    var a, add_separator, p, set_size, span, span_, subselection;
    subselection = selection.filter(function(d) {
      return key in d;
    });
    p = subselection.append("p");
    p.attr("style", "font-size: 15px; padding-top: 10px;");
    set_size = function(d) {
      var i, j, k, len, ref;
      ref = d[key];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        k = ref[i];
        k.last = d[key].length - 1 === i;
      }
      return d[key];
    };
    span = p.selectAll().data(set_size).enter().append("span");
    a = span.append("a").attr("href", function(d) {
      return d.href;
    });
    a.attr("target", "_blank");
    a.text(function(d) {
      return d.name + " ";
    });
    a.attr("download", add_download_attr);
    add_separator = function(d, i) {
      if (d.last) {
        return " ";
      } else {
        return "&nbsp;| &nbsp;";
      }
    };
    return span_ = span.append("span").html(add_separator);
  };

  build_function = function(data_text) {
    var data, selection;
    data = jsyaml.load(data_text);
    selection = d3.select("#workshops").selectAll().data(data).enter().append("li").attr("class", "collection-item avatar light-green lighten-4");
    selection.attr("style", "border-color: transparent; border-bottom-style: none; margin-bottom: 5px;");
    selection = selection.sort();
    add_logo(selection);
    add_header(selection);
    add_date(selection);
    add_description(selection);
    add_icon_links(selection);
    return add_examples(selection, "links");
  };

  d3.text(data_file, build_function);

}).call(this);
