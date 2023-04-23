<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApiFormatter;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    function get(Request $request)
    {
        $data = User::all();

        if ($request->nama) {
            $data = User::where('name', 'LIKE', '%' . $request->nama . '%')->get();
        }

        if ($request->id) {
            $data = User::find($request->id);
        }

        if ($data) {
            return ApiFormatter::createApi(200, 'Success', $data);
        }

        return ApiFormatter::createApi(400, 'Failed');
    }

    function post(Request $request)
    {
        $data = User::insert([
            'name' => $request->postName,
            'jenis_kelamin' => $request->postJK,
            'kelas_id' => $request->postKelas
        ]);

        if ($data) {
            return ApiFormatter::createApi(200, 'Success', $data);
        }
        return ApiFormatter::createApi(400, 'Failed', $data);
    }

    function delete($id)
    {
        $delete = User::destroy($id);

        if ($delete) {
            return ApiFormatter::createApi(200, 'Success');
        }

        return ApiFormatter::createApi(400, 'Failed');
    }

    function patch(Request $request, $id)
    {
        // return ApiFormatter::createApi(400, 'Failed', $request->name);


        $data = User::where('id', '=', $id)->update([
            'name' => $request->editName,
            'jenis_kelamin' => $request->editJK,
            'kelas_id' => $request->editKelas
        ]);

        // $data = DB::table('users')->where('id', '=', $id)->update([
        //     'name' => $request->editName,
        //     'jenis_kelamin' => $request->editJK
        // ]);

        if ($data) {
            return ApiFormatter::createApi(200, 'Success', $data);
        }
        return ApiFormatter::createApi(400, 'Failed');
    }
}
