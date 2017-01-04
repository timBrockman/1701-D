/*
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            height: '10px',
            suffix: '_placeholder'
          },
          {
            height: '160px',
            suffix: '_profile',
            quality: 100
          },
          {
            height: '236px',
            suffix: '_profile',
            quality: 100
          },
          {
            height: '240px',
            suffix: '_project',
            quality: 100
          },
          {
            height: '310px',
            suffix: '_profile',
            quality: 85
          },
          {
            height: '354px',
            suffix: '_project',
            quality: 85
          },
          {
            height: '465px',
            suffix: '_project',
            quality: 85
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/images/',
          dest: 'images/'
        }]
      },
      logo:{
        options:{
          engine:'im',
          sizes:[{
            height: '16px',
          },{
            height: '32px',
          },{
            height: '57px',
          },{
            height: '60px',
          },{
            height: '72px',
          },{
            height: '76px',
          },{
            height: '96px',
          },{
            height: '114px',
          },{
            height: '120px',
          },{
            height: '144px',
          },{
            height: '152px',
          },{
            height: '180px',
          },{
            height: '192px',
          },{
            height: '228px',
          },{
            height: '230px',
          }]
        },
        files:[{
          expand:true,
          src:['*.png'],
          cwd:'src/logo/',
          dest:'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images']
      },
      proto:{
        src:['proto/images']
      }
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the images that don't go through processing into the images/ directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          flatten:true,
          src: 'src/nomin/*.{gif,jpg,png,ico}',
          dest: 'images/'
        }]
      },
      proto:{
        files:[{
          expand:true,
          flatten:true,
          src:'images/*.{gif,jpg,png,ico}',
          dest:'proto/images/'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy:dev', 'responsive_images','copy:proto']);

};
