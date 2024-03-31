import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";

interface FormValues {
    file: FileList;
}

const FileUploadForm = () => {
    const {control, handleSubmit, watch, formState: {errors}} = useForm<FormValues>();
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const selectedFile = watch("file");

    // Generate file preview
    React.useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreview(fileReader.result);
            };
            fileReader.readAsDataURL(selectedFile[0]);
        }
    }, [selectedFile]);

    const onSubmit = (data: FormValues) => {
        console.log(data.file[0]); // Process your file here
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
            objectFit: 'cover' as const,
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
                        required: (files) => files.length > 0 || "File is required",
                        size: (files) =>
                            files.length === 0 || (files[0].size <= 1024 * 1024) || "File size must be less than 1MB",
                    },
                }}
                render={({field}) => (
                    <input
                        type="file"
                        style={styles.input}
                        onChange={(e) => field.onChange(e.target.files)}
                        ref={field.ref}
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