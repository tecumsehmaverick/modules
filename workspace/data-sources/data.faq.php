<?php

require_once TOOLKIT . '/class.datasource.php';

class datasourcefaq extends SectionDatasource
{
    public $dsParamROOTELEMENT = 'faq';
    public $dsParamORDER = 'asc';
    public $dsParamPAGINATERESULTS = 'no';
    public $dsParamLIMIT = '20';
    public $dsParamSTARTPAGE = '1';
    public $dsParamREDIRECTONEMPTY = 'no';
    public $dsParamREDIRECTONFORBIDDEN = 'no';
    public $dsParamREDIRECTONREQUIRED = 'no';
    public $dsParamSORT = 'sort-order';
    public $dsParamASSOCIATEDENTRYCOUNTS = 'no';

    public $dsParamINCLUDEDELEMENTS = array(
        'system:date',
        'title',
        'text: formatted'
    );

    public function __construct($env = null, $process_params = true)
    {
        parent::__construct($env, $process_params);
        $this->_dependencies = array();
    }

    public function about()
    {
        return array(
            'name' => 'FAQ',
            'author' => array(
                'name' => 'Bernardo Dias da Cruz',
                'website' => 'http://localhost/modules',
                'email' => 'bernardodiasdacruz@gmail.com'),
            'version' => 'Symphony 2.5.1',
            'release-date' => '2014-12-02T00:41:54+00:00'
        );
    }

    public function getSource()
    {
        return '3';
    }

    public function allowEditorToParse()
    {
        return true;
    }

    public function execute(array &$param_pool = null)
    {
        $result = new XMLElement($this->dsParamROOTELEMENT);

        try{
            $result = parent::execute($param_pool);
        } catch (FrontendPageNotFoundException $e) {
            // Work around. This ensures the 404 page is displayed and
            // is not picked up by the default catch() statement below
            FrontendPageNotFoundExceptionHandler::render($e);
        } catch (Exception $e) {
            $result->appendChild(new XMLElement('error', $e->getMessage() . ' on ' . $e->getLine() . ' of file ' . $e->getFile()));
            return $result;
        }

        if ($this->_force_empty_result) {
            $result = $this->emptyXMLSet();
        }

        if ($this->_negate_result) {
            $result = $this->negateXMLSet();
        }

        return $result;
    }
}