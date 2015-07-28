module.exports ={

  populateArticle: function(req) {
    return article = {
      copyright:      req.body.copyright,
      topic:          req.body.section,
      title:          req.body.title,
      abstract:       req.body.abstract,
      content:        req.body.context,
      author:         req.body.author,
      source:         req.body.source, 
      uploaded_date:  req.body.uploaded_date,
      created_date:   req.body.created_date,
      published_date: req.body.published_date,
      key_words:      req.body.key_words
    };
  }
};
