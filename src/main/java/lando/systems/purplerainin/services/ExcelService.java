package lando.systems.purplerainin.services;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Service
public class ExcelService {

    private final ResourceLoader resourceLoader;

    @Autowired
    public ExcelService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    /**
     * Open the Excel file with the specified name, assumes file is in 'resources/data'
     * @param fileName the name of the file
     * @return an Optional containing the specified workbook or an empty Optional if it was unable to load
     */
    public Optional<Workbook> openExcelFile(String fileName) {
        String location = "classpath:data/" + fileName;
        Resource fileResource = resourceLoader.getResource(location);
        try {
            Workbook workbook = new XSSFWorkbook(fileResource.getInputStream());
            log.debug("Opened excel file '{}'", location);
            return Optional.of(workbook);
        } catch (IOException e) {
            log.error("Failed to open excel file '{}': {}", location, e.getMessage());
        }
        return Optional.empty();
    }

    public String getCellValuesForRange(Sheet sheet, int firstRow, int firstCol, int lastRow, int lastCol) {
        var response = new StringBuilder();
        response.append(sheet.getSheetName()).append("\n");
        {
            // NOTE: you'd think we could just access a range of cells with "B2:M9" or something, but apparently not?
            for (int r = firstRow; r <= lastRow; ++r) {
                var row = sheet.getRow(r);

                for (int c = firstCol; c <= lastCol; ++c) {
                    var cell = row.getCell(c);

                    // TODO: handle cell types more generically,
                    //  currently this will throw an exception if the cell isn't a numeric type
                    var value = cell.getNumericCellValue();
                    response.append(String.format("%.3f", value));

                    if (c != lastCol) {
                        response.append(", ");
                    }
                }

                response.append("\n");
            }
        }
        return response.toString();
    }

}
