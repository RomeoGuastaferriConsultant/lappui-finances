<?php

namespace App\Http\Controllers;

use App\Organisme;
use App\Projet;

class ProjetController extends Controller
{
    /** collection de tous les projets pour un organisme donné */
    protected $projets;

    public function __construct()
    {
    }

    /**
     *
     */
    public function getAll($organismeId)
    {
        if ($this->projets == null) {
            $this->projets = $this->createAll();
        }

        // provided $organismeId exists in projects array ?
        $result = array_key_exists($organismeId, $this->projets)
        ? $this->projets[$organismeId]
        : array(); // else return empty array

        return response()->json($result);
    }

    /**
     * Create and return all Region instances.
     */
    public function createAll()
    {
        /** collection de tous les projets, par organisme */
        $proj1 = new Projet(
            '1',
            'Montérégie en Action',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
                .'Suspendisse feugiat est nisl, at tempor diam hendrerit sit amet. '
                .'Suspendisse a lectus sit amet lacus condimentum faucibus non id lectus.',
            'periodes'
            );

        $proj2 = new Projet(
            '2',
            'On s\'informe en région',
            'Pellentesque fermentum euismod sapien, sit amet lobortis purus dignissim pulvinar. '
                .'Proin pharetra volutpat erat id pulvinar. ',
            'periodes'
            );

        $proj3 = new Projet(
            '3',
            'La vitrine de Boucherville',
            'Vestibulum faucibus felis nulla, ut varius erat varius in. Nunc eget velit sodales, '
                .'tincidunt massa et, consequat purus. Quisque nec dolor neque. '
                .'Aenean finibus sagittis diam, sit amet posuere enim aliquet sed.',
            'periodes'
            );

        $proj4 = new Projet(
            '4',
            'Projet de Soutien et Répit',
            'Sed laoreet diam quis arcu laoreet faucibus. In ante nisi, dictum eget cursus in, '
                .'dapibus eu erat. Duis malesuada nunc dui, tincidunt euismod ex fermentum sit amet. ',
            'periodes'
            );

        return array(
            // key is organismeId
            '1' => array($proj1, $proj2),
            '2' => array($proj3, $proj4)
        );
    }
}
