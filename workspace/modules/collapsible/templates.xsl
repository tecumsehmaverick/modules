<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!--
Name: Module Collapsible
Version: 0.0.1
Author: Bernardo Dias (@bernardodiasc)
URL: https://github.com/bernardodiasc/module-collapsible

Description: This module is a description list markup with accordeon behavior

Usage: <xsl:apply-templates select="data/faq" mode="collapsible" />

API (XML):

<faq>
    <section id="3" handle="faq">FAQ</section>
    <entry id="19">
        <title handle="exercitation-ullamco-laboris-nisi-ut-aliquip-ex">Exercitation ullamco laboris nisi ut aliquip ex</title>
        <text mode="formatted">
            <p>markup content goes here</p>
        </text>
        <system-date>
            <created iso="2014-12-01T20:01:04-02:00" timestamp="1417471264" time="20:01" weekday="1" offset="-0200">2014-12-01</created>
            <modified iso="2014-12-01T20:01:04-02:00" timestamp="1417471264" time="20:01" weekday="1" offset="-0200">2014-12-01</modified>
        </system-date>
    </entry>
</faq>

-->

<xsl:import href="../../utilities/ninja.xsl"/>

<xsl:template match="*[section/@handle = 'faq']" mode="collapsible">
    <module class="collapsible" data-module="collapsible" data-blabla="asas">
        <h1>Collapsible module [using data from FAQ section]</h1>
        <dl>
            <xsl:for-each select="entry">
                <dt>
                    <h2><xsl:value-of select="title"/>?</h2>
                </dt>
                <dd>
                    <xsl:apply-templates select="text/*" mode="html"/>
                </dd>
            </xsl:for-each>
        </dl>
    </module>
</xsl:template>

</xsl:stylesheet>