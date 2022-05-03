function readFile() {
  
    if (this.files && this.files[0]) {
        
        var FR= new FileReader();
        
        FR.addEventListener("load", function(e) {
            $("#image-preview").attr('src', e.target.result);
            $("input[name='image']").val(e.target.result);
        }); 
        
        FR.readAsDataURL( this.files[0] );
    }

}

document.getElementById("imageFile").addEventListener("change", readFile);