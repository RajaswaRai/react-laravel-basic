<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RekapitulasiController extends Controller
{
    public function index()
    {
        return Inertia::render('Rekapitulasi', [
            'title' => 'Rekapitulasi',
        ]);
    }

    public function detail($id)
    {
        return Inertia::render('Detail', [
            'id' => $id,
            'title' => 'Detail',
        ]);
    }
}
