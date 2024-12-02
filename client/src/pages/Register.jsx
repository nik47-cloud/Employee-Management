import {useState} from 'react';
import {registerUser} from '../services/authService';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(username, password);
            setToast(response.data.message);
            setError(null);
            setUsername("")
            setPassword("")
            setTimeout(() => {
                setToast(null);
            }, 3000)
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const clickHandler = () => {
        navigate('/login');
    }
    return (<div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {toast && <p className="text-green-500 mb-4">{toast}</p>}
            <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 px-4 py-2 border w-full rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 px-4 py-2 border w-full rounded"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Register
            </button>
            <div>
                <p className="text-center">Or</p>
                <button
                    onClick={clickHandler}
                    className="w-full border-2 py-2  text-black "
                >
                    Login
                </button>
            </div>
        </form>
    </div>);
};

export default Login;
