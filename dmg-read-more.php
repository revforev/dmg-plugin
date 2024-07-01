<?php
/*
Plugin Name: DMG Read More
Description: A plugin to add a Gutenberg block and WP-CLI command.
Version: 1.0
Author: Your Name
*/

if (!defined('ABSPATH')) {
    exit;
}

include_once plugin_dir_path(__FILE__) . 'includes/gutenberg-block.php';

if (defined('WP_CLI') && WP_CLI) {
    include_once plugin_dir_path(__FILE__) . 'includes/wp-cli-command.php';
}
?>
