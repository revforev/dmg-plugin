(function (wp) {
  const {registerBlockType} = wp.blocks;
  const {__} = wp.i18n;
  const {useState, useEffect} = wp.element;
  const {InspectorControls} = wp.blockEditor;
  const {PanelBody, TextControl, SelectControl} = wp.components;
  const apiFetch = wp.apiFetch;

  registerBlockType('dmg/read-more', {
    title: __('Read More', 'dmg'),
    icon: 'admin-links',
    category: 'common',
    attributes: {
      postID: {
        type: 'number',
        default: 0,
      },
      postTitle: {
        type: 'string',
        default: '',
      },
      postLink: {
        type: 'string',
        default: '',
      },
    },
    edit: (props) => {
      const {attributes, setAttributes} = props;
      const {postID, postTitle, postLink} = attributes;
      const [search, setSearch] = useState('');
      const [posts, setPosts] = useState([]);

      useEffect(() => {
        const fetchPosts = async () => {
          const params = search ? `?search=${search}` : '';
          const posts = await apiFetch({path: `/wp/v2/posts${params}`});
          setPosts(posts);
        };
        fetchPosts();
      }, [search]);

      const onChangeSearch = (value) => {
        setSearch(value);
      };

      const onSelectPost = (post) => {
        setAttributes({
          postID: post.id,
          postTitle: post.title.rendered,
          postLink: post.link,
        });
      };

      return (
        <div>
          <InspectorControls>
            <PanelBody title={__('Select Post', 'dmg')}>
              <TextControl
                label={__('Search Post', 'dmg')}
                value={search}
                onChange={onChangeSearch}
              />
              <SelectControl
                label={__('Choose a post', 'dmg')}
                value={postID}
                options={posts.map((post) => ({
                  label: post.title.rendered,
                  value: post.id,
                }))}
                onChange={(value) => {
                  const selectedPost = posts.find((post) => post.id == value);
                  onSelectPost(selectedPost);
                }}
              />
            </PanelBody>
          </InspectorControls>
          {postID ? (
            <p className="dmg-read-more">
              Read More: <a href={postLink}>{postTitle}</a>
            </p>
          ) : (
            <p>{__('No post selected', 'dmg')}</p>
          )}
        </div>
      );
    },
    save: (props) => {
      const {postID, postTitle, postLink} = props.attributes;
      return postID ? (
        <p className="dmg-read-more">
          Read More : <a href={postLink}>{postTitle}</a>
        </p>
      ) : null;
    },
  });
})(window.wp);
