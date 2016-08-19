var $ = require("jquery");

$(document).ready(function() {
  $.ajax({type: 'GET',
          url: 'api/categories',
          success: function(data){
            appendCategoryList();
            renderCatgories(data);
          }
    });
});

function renderCatgories(categories) {
  for (i = 0; i < categories.length; i++) {
    addCategoryToList(categories[i]);
  }

  $("a.category").on("click", function() {
    var categoryId = $(this).data("id");
    $.ajax({type: 'GET',
            url: 'api/categories/' + categoryId + '/articles',
            success: function(data){
            clearContent();
            appendArticleList();
            renderArticles(data);
            }
        });
  });
}

function appendCategoryList() {
  $("#content").append("<h2>Categories</h2><ul class='item-list'><ul>");
}

function addCategoryToList(category) {
  $("ul.item-list").append("<li><a class='category' data-id='" + category.id + "'>" + category.title + "</a></li>");
}

function clearContent() {
  $("#content").html("");
}

function appendArticleList() {
  $("#content").append("<h2>Articles</h2><ul class='item-list'><ul>");
}

function renderArticles(articles) {
  for (i = 0; i < articles.length; i++) {
    addArticleToList(articles[i]);
  }

  $("a.article").on("click", function() {
    var articleId = $(this).data("id");
    $.ajax({type: 'GET',
            url: 'api/articles/' + articleId,
            success: function(data){
            clearContent();
            renderArticle(data);
            }
        });
  });
}

function addArticleToList(article) {
  $("ul.item-list").append("<li><a class='article' data-id='" + article.id + "'>" +
                            article.title + ", by " + article.author + " on " +
                            article.publish_date + "</a></li>");
}

function renderArticle(article) {
  $("#content").append("<article class='article'><h2>" + article.title +
                    "</h2><p>by <em>" + article.author + "</em>, on <em>" +
                    article.publish_date + "</em> <label><input type='checkbox' checked> (read already)</label>" +
                    "<p>Category <a>" + article.category.title + "</a></p> <div class='article-body'><p>" +
                    article.content + "</p></div></article>");
}
