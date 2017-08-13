<?php
	
	$config = json_decode(file_get_contents('./config/charsheet-config.json'));

	$attributes = $config->statsData;

?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Cthulhu Character Generator</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script type="text/javascript">
		var config = <?php echo json_encode($config ?: array()); ?>;
	</script>
	<script src="js/dice.js"></script>
	<script src="js/main.js"></script>
	<link rel="stylesheet" href="css/bootstrap.min.css"/>
</head>
<body>
	<h1>Stats</h1>
	<div class="container">
		<div class="row">
			<ul class="stats col-md-5">
			<?php foreach($attributes as $id => $attr): ?>
				<li class="">
					<span class=""><?php echo strtoupper($id) ?></span>
					<input class="stat-field" id="<?php echo $id ?>" type="number"/>
					<button class="roll btn btn-default" data-stat="<?php echo $id ?>">Roll!</button>
				</li>
			<?php endforeach; ?>
			</ul>
			<ul class="stats col-md-5 list-group">
				<li>Glück: <input id="luck" type="number"/> <button class="roll btn btn-sm" data-stat="luck">Roll!</button></li> <!-- 3w6*5 -->
				<li>Alter: <input id="age" type="number"/> <button class="confirmAge btn btn-sm">Bestätigen</button>
				<li id="ageDesc"></li>
					<ul>
						<p>Malus: <span id="agemalus">0</span></p>
						<?php foreach($attributes as $id => $attr): ?>
							<li class="malus" style="display: none;" data-stat="<?php echo $id ?>"><?php echo strtoupper($id) ?>: <input id="<?php echo $id ?>-malus" type="number"/></li>
						<?php endforeach; ?>
						<p>Bonuswürfe:</p>
						<li class ="luckBonusRoll" style="display: none;">Glück:<button class="roll btn btn-sm" data-stat="luck">Roll!</button></li>
						<li class="hidden">BI: <input type="number" readonly/> <button class="roll btn btn-sm" data-stat="BI-Steigerung">Roll! (<span id="agebonus">0</span>)</button></li>
					</ul>
				</li> <!-- Bonus/Malus blurb -->
				
			</ul>
		</div>
	</div>
</body>
</html>