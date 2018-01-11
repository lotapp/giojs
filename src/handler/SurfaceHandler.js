/**
 * Created by ss on 2018/1/9.
 */

function SurfaceHandler(controller) {

    function getPickColor(mouseX, mouseY) {

        var ctx = controller.earthSurfaceShader.lookupCanvas.getContext('2d');
        ctx.clearRect(0, 0, 256, 1);

        var oceanFill = 0;
        ctx.fillStyle = 'rgb(' + oceanFill + ',' + oceanFill + ',' + oceanFill +')';
        ctx.fillRect( 0, 0, 1, 1 );

        controller.earthSurfaceShader.uniforms['outlineLevel'].value = 0;
        controller.earthSurfaceShader.uniforms['flag'].value = 0;

        controller.earthSurfaceShader.lookupTexture.needsUpdate = true;

        controller.renderer.autoClear = false;
        controller.renderer.autoClearColor = false;
        controller.renderer.autoClearDepth = false;
        controller.renderer.autoClearStencil = false;

        controller.renderer.clear();
        controller.renderer.render(controller.scene, controller.camera);

        var gl = controller.renderer.context;
        gl.preserveDrawingBuffer = true;

        var mx = ( mouseX + controller.renderer.context.canvas.width / 2 );
        var my = ( -mouseY + controller.renderer.context.canvas.height / 2 );
        mx = Math.floor(mx);
        my = Math.floor(my);

        var buf = new Uint8Array(4);
        // console.log(buf);
        gl.readPixels(mx, my, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf);
        // console.log(buf);

        controller.renderer.autoClear = true;
        controller.renderer.autoClearColor = true;
        controller.renderer.autoClearDepth = true;
        controller.renderer.autoClearStencil = true;

        gl.preserveDrawingBuffer = false;

        controller.earthSurfaceShader.uniforms['outlineLevel'].value = 1;
        controller.earthSurfaceShader.uniforms['flag'].value = 1;

        return buf[0];
    }

    function highlightCountry(code) {
        var ctx = controller.earthSurfaceShader.lookupCanvas.getContext('2d');
        ctx.clearRect(0, 0, 256, 1);

        var oceanFill = 10;
        ctx.fillStyle = 'rgb(' + oceanFill + ',' + oceanFill + ',' + oceanFill +')';
        ctx.fillRect( 0, 0, 1, 1 );

        var fillCSS = '#eeeeee';

        ctx.fillStyle = fillCSS;
        ctx.fillRect(code, 0, 1, 1);

        controller.earthSurfaceShader.lookupTexture.needsUpdate = true;
    }

    function setSurfaceColor(color) {

        controller.earthSurfaceShader.setShaderColor(color);
    }

    function setSelectedColor(color) {

        controller.earthSurfaceShader.setHighlightColor(color);
    }

    return {

        getPickColor: getPickColor,

        highlightCountry: highlightCountry,

        setSurfaceColor: setSurfaceColor,

        setSelectedColor: setSelectedColor
    }
}

export {SurfaceHandler}