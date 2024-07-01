<?php
function dmg_read_more_block_init() {
    wp_register_script(
        'dmg-read-more-block',
        plugins_url('../blocks/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'),
        filemtime(plugin_dir_path(__FILE__) . '../blocks/index.js')
    );

    register_block_type('dmg/read-more', array(
        'editor_script' => 'dmg-read-more-block',
    ));
}
add_action('init', 'dmg_read_more_block_init');
?>
