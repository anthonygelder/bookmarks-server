function makeBookmarksArray() {
    return [
        {
            id: 1,
            title: 'title 1',
            url: 'www.test1.com',
            description: 'test 1 website',
            rating: 1
        },
        {
            id: 2,
            title: 'title 2',
            url: 'www.test2.com',
            description: 'test 2 website',
            rating: 1
        },
        {
            id: 3,
            title: 'title 3',
            url: 'www.test3.com',
            description: 'test 3 website',
            rating: 1
        },
        {
            id: 4,
            title: 'title 4',
            url: 'www.test4.com',
            description: 'test 4 website',
            rating: 1
        },
    ];
  }

  function makeMaliciousBookmark() {
    const maliciousBookmark = {
        id: 911,
        title: 'Naughty naughty very naughty <script>alert("xss");</script>',
        url: 'www.test.com',
        description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        rating: 1
    }
    const expectedBookmark = {
      ...maliciousBookmark,
      title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
      maliciousBookmark,
      expectedBookmark,
    }
  }
  
  module.exports = {
    makeBookmarksArray,
    makeMaliciousBookmark,
  }