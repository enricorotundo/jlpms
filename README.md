## Resources

* [Diagram](https://drive.google.com/file/d/1yV2mwOS_PBfie5ESKW5XS_1je3avt7fY/view?usp=sharing)
* [Working document](https://docs.google.com/document/d/1rf-1DRNkWOafQqWAoHI7KlGN9Wi6v8q10sGg6VGqLec/edit?usp=sharing)
* [Github REST v3](https://developer.github.com/v3/)

## Components

* database (mlab)
* lambdas
    * fetcher (python - aws lambda)
    * readme (python - aws lambda)
* server-api (node.js)
* webapp (React with dedicated express static server + prerender middleware)
* prerender ([Prerender](https://github.com/prerender/prerender) server)


## Database

* version: mongo v3.6.8 
* name: `jlpms`
* collections:
    * `items`
        * Descr: repositories pulled from GitHub 
        * Indexes: `_id`, `id`
    * `readmes`
        * Descr: 
            * responses from [get the readme](https://developer.github.com/v3/repos/contents/#get-the-readme) endpoint
            * raw readme content from `download_url`
        * Indexes: `_id`, `id`
