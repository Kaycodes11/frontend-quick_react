import React, {useState, useEffect} from "react";
import Dropdown from "./Dropdown";
import {useForm} from "react-hook-form";
import TagsInput from "./Tags";

// Define the Option type here
type Option = {
    label: string;
    value: string;
};

const fetchOptions = (): Promise<Option[]> => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            const options: Option[] = [
                {label: 'Option 1', value: '1'},
                {label: 'Option 2', value: '2'},
                {label: 'Option 3', value: '3'}
            ];
            resolve(options);
            // Uncomment below line to test error handling
            // reject(new Error('Failed to fetch options'));
        }, 1000);
    });
};

const MyForm = () => {
    const {control, handleSubmit} = useForm<{
        dropdown: string;
        tags: string[];
    }>({
        defaultValues: {
            dropdown: '',
            tags: [],
        },
    });

    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadOptions = async () => {
            setLoading(true);
            try {
                const fetchedOptions = await fetchOptions();
                setOptions(fetchedOptions);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch options');
                setLoading(false);
            }
        };

        loadOptions().then(r => console.log(r));
    }, []);

    const onSubmit = (data: any) => console.log(data);

    const styles: Record<string, React.CSSProperties> = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        },
        loader: {
            margin: '20px',
        },
        error: {
            color: 'red',
            margin: '20px',
        },
    };

    return (
        <div>
            {loading && <div style={styles.loader}>Loading...</div>}
            {error && <div style={styles.error}>{error}</div>}
            {!loading && !error && (
                <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                    <Dropdown
                        name="dropdown"
                        options={options}
                        control={control}
                        label="Dropdown"
                    />
                    <TagsInput name="tags" control={control}/>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default MyForm;
