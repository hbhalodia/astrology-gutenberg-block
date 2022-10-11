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
	register_block_type( __DIR__ . '/build/astro-gutenberg-block' );

	register_block_type(
		'create-block/single-post-block',
		[
			'render_callback' => 'render_single_post_block',
			'attributes'      => [
				'postId'             => [
					'type'    => 'integer',
					'default' => 0,
				],
				'ImageOnLeft'        => [
					'type'    => 'boolean',
					'default' => false,
				],
				'DisableDate'        => [
					'type'    => 'boolean',
					'default' => false,
				],
				'DisableExcerpt'        => [
					'type'    => 'boolean',
					'default' => false,
				],
			],
		]
	);
}
add_action( 'init', 'create_block_astro_gutenberg_block_block_init' );

/**
 * Function to render the server side for editor as well as saveed content markup.
 *
 * @param array $attributes Block Attributes.
 *
 * @return void
 */
function render_single_post_block( $attributes ) {
	$attributes = wp_parse_args( $attributes, [] );

	$border_side = 'div-border-left';
	if ( array_key_exists( 'ImageOnLeft', $attributes ) && 1 === (int) $attributes['ImageOnLeft'] ) {
		$image_pos   = 'left-image';
		$border_side = 'div-border-right';
	}

	if ( array_key_exists( 'DisableExcerpt', $attributes ) && 1 === (int) $attributes['DisableExcerpt'] ) {
		$excerpt = 'do-not-show';
	}

	if ( array_key_exists( 'DisableDate', $attributes ) && 1 === (int) $attributes['DisableDate'] ) {
		$date = 'do-not-show';
	}

	if ( ! array_key_exists( 'postId', $attributes ) || 0 === (int) $attributes['postId'] ) {
		return '';
	}

	$post = get_post( (int) $attributes['postId'] );
	$src  = '';
	$thumbnail_id = get_post_thumbnail_id( $post );


	if ( false !== $thumbnail_id && 0 !== $thumbnail_id ) {
		$src = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail' );
	}
	ob_start();
	?>
		<div class="single-block-container <?php echo sanitize_html_class( $image_pos ); ?>">
			<div class="column single-block-data">
				<div class="single-post-title">
					<h2 class="post-title"><?php echo esc_html( $post->post_title ); ?></h2>
				</div>
				<div class="single-post-excerpt <?php echo sanitize_html_class( $excerpt ); ?>">
					<p><b><?php esc_html_e( 'Excerpt : ', 'astro-gutenberg-block' ); ?></b><?php echo esc_html( $post->post_excerpt ); ?></p>
				</div>
				<div class="single-post-date <?php echo sanitize_html_class( $date ); ?>">
					<p><b><?php esc_html_e( 'Date - ', 'astro-gutenberg-block' ); ?></b><?php echo esc_html( human_time_diff( strtotime( $post->post_date ) ) ); ?></p>
				</div>
			</div>
			<div class="column single-block-image <?php echo sanitize_html_class( $border_side ); ?> ">
				<?php
					if ( '' !== $src ) {
						?>
							<img class="single-block-image-img" src="<?php echo esc_url( $src[0] ); ?>" height = "150" width="300" />
						<?php
					} else {
						?>
							<div><?php esc_html_e( 'No Featured Image', 'astro-gutenberg-block' ); ?></div>
						<?php
					}
				?>
			</div>
		</div>
	<?php

	$markup = ob_get_clean();

	return $markup;
}

/**
 * Function to enqueue block and editor style.
 *
 * @return void
 */
function enqueue_single_post_block() {
	wp_enqueue_script(
		'single-post-block',
		GUTENBERG_LEARNING_URL . '/build/single-post-block/index.js',
		array(),
		filemtime( GUTENBERG_LEARNING_PATH . '/build/single-post-block/index.js' ),
		true,
	);
	wp_enqueue_style(
		'single-post-block-editor-style',
		GUTENBERG_LEARNING_URL . '/build/single-post-block/index.css',
		array(),
		filemtime( GUTENBERG_LEARNING_PATH . '/build/single-post-block/index.css' ),
	);
}
add_action( 'enqueue_block_editor_assets', 'enqueue_single_post_block' );

/**
 * Function to enqueue style for the frontend.
 *
 * @return void
 */
function add_style_for_gutenberg_block() {
	wp_enqueue_style(
		'single-post-block-saved-content-style',
		GUTENBERG_LEARNING_URL . '/build/single-post-block/style-index.css',
		array(),
		filemtime( GUTENBERG_LEARNING_PATH . '/build/single-post-block/style-index.css' ),
	);
}
add_action( 'wp_enqueue_scripts', 'add_style_for_gutenberg_block' );

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
	register_post_meta( 'post', 'astro_category_id', array(
		'show_in_rest'      => true,
		'type'              => 'number',
		'single'            => true,
		'default'           => 0,
		'auth_callback'     => function() {
			return current_user_can( 'edit_posts' );
		}
	) );
}
add_action( 'init', 'register_custom_meta' , 10 );
