<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!--
Usage: <xsl:apply-templates select="data/<data-source-handle>" mode="slideshow" />

API (XML):

<gallery>
    <section id="4" handle="gallery">Gallery</section>
    <entry id="20">
        <image size="1.32 MB" bytes="1382923" path="/uploads/gallery" type="image/jpeg">
            <filename>2014-11-29-13-48-45.jpg</filename>
            <meta creation="2014-12-02T17:00:16-02:00" width="1600" height="1200" />
        </image>
        <system-date>
            <created iso="2014-12-02T17:00:16-02:00" timestamp="1417546816" time="17:00" weekday="2" offset="-0200">2014-12-02</created>
            <modified iso="2014-12-02T17:00:29-02:00" timestamp="1417546829" time="17:00" weekday="2" offset="-0200">2014-12-02</modified>
        </system-date>
    </entry>
</gallery>
-->

<xsl:template match="*[section/@handle = 'gallery']" mode="slideshow">
    <h1>Slideshow module [Data from Gallery Section]</h1>
    <module class="slideshow" data-module="slideshow">
        <xsl:for-each select="entry">
            <div class="slide js-slide" data-index="{position()}">
                <xsl:if test="position() = 1">
                    <xsl:attribute name="class">slide js-slide active</xsl:attribute>
                </xsl:if>
                <img src="{$root}/image/2/500/250/5{image/@path}/{image/filename}" alt="{title}"/>
            </div>
        </xsl:for-each>

        <nav class="nav js-nav">
            <button class="prev js-prev">Prev</button>
            <button class="next js-next">Next</button>
        </nav>

        <nav class="control js-control">
            <xsl:for-each select="entry">
                <button class="control-item js-control-item" data-index="{position()}">
                    <xsl:if test="position() = 1">
                        <xsl:attribute name="class">control-item js-control-item active</xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="position()"/>
                </button>
            </xsl:for-each>
        </nav>
    </module>
</xsl:template>

</xsl:stylesheet>
