<?php
	
	$config = json_decode(file_get_contents('./config/charsheet-config.json'));

	$attributes = $config->statsData;

?>
<script type="text/javascript">
	var $config = <?php echo json_encode($config ?: array()); ?>;
</script>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Cthulhu Character Generator</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/main.js"></script>
	<link rel="stylesheet" href="css/bootstrap.min.css"/>
</head>
<body>
	<h1>Stats</h1>
	<div class="container">
		<div class="row">
			<ul class="stats col-md-5">
			<?php foreach($attributes as $id => $attr): ?>
				<li><?php echo strtoupper($id) ?>: <input id="<?php echo $id ?>" type="number"/> <button class="roll" data-stat="<?php echo $id ?>">Roll!</button></li>
			<?php endforeach; ?>
			</ul>
			<ul class="stats col-md-5">
				<li>Glück: <input id="luck" type="number"/> <button class="roll" data-stat="luck">Roll!</button></li> <!-- 3w6*5 -->
				<li>Alter: <input id="age" type="number"/> <button class="confirmAge">Bestätigen</button>
				<li id="ageDesc"></li>
					<ul>
						<p>Malus: <span id="agemalus">0</span></p>
						<li class="malusST" style="display: none;">ST: <input type="number"/></li>
						<li class="malusKO" style="display: none;">KO: <input type="number"/></li>
						<li class="malusMA" style="display: none;">MA: <input type="number"/></li>
						<li class="malusER" style="display: none;">ER: <input type="number"/></li>
						<li class="malusGE" style="display: none;">GE: <input type="number"/></li>
						<li class="malusGR" style="display: none;">GR: <input type="number"/></li>
						<li class="malusIN" style="display: none;">IN: <input type="number"/></li>
						<p>Bonus Würfe:</p>
						<li class ="luckBonusRoll" style="display: none;">Glück Bonus Wurf:<button class="roll" data-stat="luck">Roll!</button></li>
						<li style="display: none;">BI: <input type="number" readonly/> <button class="roll" data-stat="BI-Steigerung">Roll! (<span id="agebonus">0</span>)</button></li>
					</ul>
				</li> <!-- Bonus/Malus blurb -->
				
			</ul>
		</div>
	</div>
</body>
</html>