module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    //根目录文件打包
                    {expand: true, cwd: 'src/lib', src: '**', dest: 'lib/'},
                ],
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);
};