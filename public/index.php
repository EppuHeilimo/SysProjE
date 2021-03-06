<?php
require_once(__DIR__ . "/../lib/util.functions.php");
requireLoggedIn();
$username = getUser()->getUsername();
?>


<html>
<head>

	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1"/>
	<style>
	body
	{
		margin: 0;
		padding: 0;
    }
	#gCanvas
	{
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	</style>
	<title>Medicutor: Pharmacist From Hell</title>
	
</head>

<body style="margin: 0px;">
	<canvas id="gCanvas" width="480" height="600"></canvas>
    
    <script>
        var username = '<?php echo $username; ?>';
    </script>
	
	<script src="js/util.js"></script>
	<script src="js/vector.js"></script>
	<script src="js/aabb.js"></script>
	<script src="js/time.js"></script>
    <script src="js/myAudio.js"></script>
    <script src="js/gameLogic.js"></script>
	<script src="js/engine.js"></script>
	<script src="js/dialogue.js"></script>
    <script src="js/MyDebugger.js"></script>
	
	
	<script src="js/object/gameObject.js"></script>
	<script src="js/drugs.js"></script>
	<script src="js/object/tooltip.js"></script>
	<script src="js/object/speechBubble.js"></script>
	
	<script src="js/object/context.js"></script>
	<script src="js/object/initGame.js"></script>
    <script src="js/object/movableObject.js"></script>
	<script src="js/object/button.js"></script>
	
	<script src="js/objects.js"></script>
	<script src="js/menu/menu.js"></script>
	<script src="js/cabinet/cabinet.js"></script>
	
	<script src="js/input.js"></script>
	<script src="js/randomName.js"></script>
	<script src="js/texture.js"></script>
	<script src="js/person.js"></script>
	<script src="js/label.js"></script>
	<script src="js/canvas.js"></script>
    <script src="js/score.js"></script>
	<script src="js/object/Timer.js"></script>

	<script type="text/javascript">
    window.doorbellOptions = {
        appKey: 'Lk9qZQ2nhfU228PzX36FIRAblIEJfVhwWRkjYsb9s7g0KpzLAn7ozTrdOt3iea6X'
    };
    (function(d, t) {
        var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/3234?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g);
    }(document, 'script'));
</script>
</body>
</html>


