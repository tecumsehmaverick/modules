<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="../modules/collapsible/templates.xsl"/>

<xsl:output method="xml"
	doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
	doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
	omit-xml-declaration="yes"
	encoding="UTF-8"
	indent="no" />

<xsl:template match="/">
	<html>
		<head>
			<title>Modules Test Page</title>
			<link rel="stylesheet" href="{$workspace}/assets/dist/css/main.min.css"/>
		</head>
		<body>
		    <xsl:apply-templates select="data/faq" mode="collapsible" />
			<script src="{$workspace}/assets/dist/js/main.min.js"></script>
		</body>
	</html>
</xsl:template>

</xsl:stylesheet>
