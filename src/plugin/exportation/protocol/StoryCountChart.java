package plugin.exportation.protocol;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import ntut.csie.protocal.Action;

import org.kohsuke.stapler.StaplerRequest;
import org.kohsuke.stapler.StaplerResponse;

public class StoryCountChart implements Action {
	@Override
	public String getUrlName() {
		return "StoryCountChart";
	}

	public void doGetStoryCountChartPage(StaplerRequest request, StaplerResponse response) {	
		writeStoryCountChartPage(response);
	}
	
	public String getWebInfPath(){
		String WEBINF = "WEB-INF";
		String filePath = "";
		URL url = StoryCountChart.class.getResource("StoryCountChart.class");
		String className = url.getFile();
		filePath = className.substring(0,className.indexOf(WEBINF) + WEBINF.length());
		return filePath;
	}
	
	private void writeStoryCountChartPage(StaplerResponse response) {
		response.setContentType("text/html; charset=utf-8");
		File file = new File(getWebInfPath() + "/index.jsp");
		
		try {
			Scanner input = new Scanner(file);
			PrintWriter writer = response.getWriter();
			while(input.hasNext()) {
				writer.write(input.nextLine());
				writer.write("\n");
			}
			input.close();
		} catch (FileNotFoundException e) {
			System.out.println("file not found.");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
