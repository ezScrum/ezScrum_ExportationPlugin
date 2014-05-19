package plugin.exportation.protocol;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;

import ntut.csie.ezScrum.pic.core.IUserSession;
import ntut.csie.ezScrum.web.form.ProjectInfoForm;
import ntut.csie.ezScrum.web.internal.IProjectSummaryEnum;
import ntut.csie.protocal.Action;

import org.kohsuke.stapler.StaplerRequest;
import org.kohsuke.stapler.StaplerResponse;

public class StoryCountChartAction implements Action {
	@Override
	public String getUrlName() {
		return "StoryCountChart";
	}

	public void doGetStoryCountChartPage(StaplerRequest request, StaplerResponse response) {
//		HttpSession session = request.getSession();
//		ProjectInfoForm projectInfoForm = (ProjectInfoForm) session.getAttribute(IProjectSummaryEnum.PROJECT_INFO_FORM);
//		IUserSession userSession = (IUserSession) session.getAttribute("UserSession");
//		String userName = userSession.getAccount().getName();
//		String encodedPassword = (String) session.getAttribute("passwordForPlugin");
//		String projectId = projectInfoForm.getName();
//		InputStream in = null;
//		PrintWriter writer = null;
//		try {
//			String ezScrumURL = request.getServerName() + ":" + request.getLocalPort() + request.getContextPath();
//			EzScrumWebServiceController service = new EzScrumWebServiceController(ezScrumURL);
//			/**
//			 * TODO: do something here
//			 */
//			response.getWriter().write("");
//		} catch (IOException e) {
//			e.printStackTrace();
//		} finally {
//			if (writer != null)
//				writer.close();
//		}
		
		System.out.println("TeST TEST TEST");
		
//		try {
//			response.forward(this, "helloJSP", request);
//		} catch (IOException | ServletException e) {
//			System.out.println(e);
//			System.out.println(e.getMessage());
//		}
	}
	
	private void writeStoryCountChartPage(StaplerResponse response) {
		response.setContentType("text/html; charset=utf-8");
		
	}
}
