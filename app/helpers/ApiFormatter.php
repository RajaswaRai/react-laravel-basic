<?php

namespace App\Helpers;

class ApiFormatter
{
    protected static $response = [
        'status' => null,
        'message' => null,
        'data' => null
    ];

    public static function createApi($status = null, $message = null, $data = null)
    {

        $reponse['status'] = $status;
        $reponse['message'] = $message;
        $reponse['data'] = $data;

        return response()->json($reponse['data'], $reponse['status']);
    }
}
