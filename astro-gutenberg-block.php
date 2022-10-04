<?php
/**
 * Plugin Name:       Astro Gutenberg Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       astro-gutenberg-block
 *
 * @package           create-block
 */

define( 'GUTENBERG_LEARNING_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'GUTENBERG_LEARNING_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_astro_gutenberg_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_astro_gutenberg_block_block_init' );

/**
 * Registering the custom metas.
 *
 * @return void
 */
function register_custom_meta() {
	register_post_meta( 'post', 'astro_sign', array(
		'show_in_rest'      => true,
		'type'              => 'string',
		'single'            => true,
		'auth_callback'     => function() {
			return current_user_can( 'edit_posts' );
		}
	) );
	register_post_meta( 'post', 'astro_sign_image', array(
		'show_in_rest'      => true,
		'type'              => 'number',
		'single'            => true,
		'auth_callback'     => function() {
			return current_user_can( 'edit_posts' );
		}
	) );
}
add_action( 'init', 'register_custom_meta' , 10 );

/**
 * Add Block scripts.
 *
 * @return void
 */
function editor_scripts() {
	$editor_dependency = array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-core-data', 'wp-edit-post', 'wp-plugins', 'wp-rich-text' );
	wp_enqueue_script(
		'test-meta-fields',
		GUTENBERG_LEARNING_URL . '/build/index.js',
		$editor_dependency,
		filemtime( GUTENBERG_LEARNING_PATH . '/build/index.js' )
	);
}
add_action( 'enqueue_block_editor_assets','editor_scripts' );
