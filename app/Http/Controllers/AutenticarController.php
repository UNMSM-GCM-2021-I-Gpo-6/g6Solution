<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistroRequest;
use App\Models\Persona;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AutenticarController extends Controller
{
    public function registro(RegistroRequest $request)
    {
        // Registro en la tabla personas
        $persona = new Persona();
        $persona->nombre = $request->nombre;
        $persona->apellido = $request->apellido;
        $persona->save();

        // Registro en la tabla users
        $user = new User();
        $user->idPersona = $persona->id;
        $user->username = $request->username;
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'res' => true,
            'msg' => 'Usuario registrado correctamente',
            'users' => $user,
            'personas' => $persona
        ], 200);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)){
            throw ValidationException::withMessages([
                'message' => ['Invalid login or password.'],
            ]);
        }

        $token = $user->createToken($request->username)->plainTextToken;

        return response()->json([
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'token delete successful',
            'data' => $request->user()
        ], 200);
    }
}
