import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";

interface FormValues {
    file: FileList | null; // Allow null to acknowledge the initial state
}

const FileUploadForm = () => {
    const {control, handleSubmit, watch, formState: {errors}, setValue} = useForm<FormValues>({
        defaultValues: {
            file: null,
        },
    });
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const selectedFile = watch("file");

    React.useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            const fileReader = new FileReader();
            fileReader.onload = () => setPreview(fileReader.result);
            fileReader.readAsDataURL(selectedFile[0]);
        } else {
            // clear preview if no file is selected
            setPreview(null);
        }
    }, [selectedFile]);

    const onSubmit = (data: FormValues) => {
        if (data.file && data.file.length > 0) {
            console.log(data.file[0]); // Process your file here
        }
    };

    const styles: Record<string, React.CSSProperties> = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
        },
        input: {
            margin: '10px 0',
        },
        preview: {
            maxWidth: '200px',
            maxHeight: '200px',
            objectFit: 'cover',
        },
        error: {
            color: 'red',
        },
        submitButton: {
            padding: '10px 20px',
            cursor: 'pointer',
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <Controller
                control={control}
                name="file"
                rules={{
                    validate: {
                        required: (files) => files && files.length > 0 || "File is required",
                        size: (files) => !files || (files[0]?.size <= 1024 * 1024) || "File size must be less than 1MB",
                    },
                }}
                render={({field: {onChange, ref}}) => (
                    <input
                        type="file"
                        style={styles.input}
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files && files[0]?.size > 1024 * 1024) {
                                alert("File size must be less than 1MB");
                                e.target.value = ''; // Clear the input if file is too large
                                setValue("file", null); // Also clear the file value in form state
                                return;
                            }
                            onChange(files); // Ensure files is not null here
                            setValue("file", files); // Set the value conditionally
                        }}
                        ref={ref}
                    />
                )}
            />

            {errors.file && <p style={styles.error}>{errors.file.message}</p>}

            {preview && <img src={preview as string} alt="Preview" style={styles.preview}/>}

            <button type="submit" style={styles.submitButton}>Upload</button>
        </form>
    );
};

export default FileUploadForm;